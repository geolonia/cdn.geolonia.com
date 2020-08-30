const fs = require("fs");
const https = require("https");
const mkdirp = require("mkdirp");
const path = require("path");
const child_process = require("child_process");
const rimraf = require("rimraf");
const data_dir = path.resolve(__dirname, "..", "data");
const dest_dir = path.resolve(__dirname, "..", "public", "polygons");

const removeData = (path) => {
  return new Promise((resolve, reject) => {
    rimraf(path, (error) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

const download = (url, prefCode) => {
  return new Promise((resolve, reject) => {
    const filepath = path.resolve(data_dir, `${prefCode}.zip`);
    const file = fs.createWriteStream(filepath);
    https.get(url, (response) =>
      response
        .pipe(file)
        .on("finish", () => resolve(filepath))
        .on("error", (error) => reject(error))
    );
  });
};

const unzip = (filepath) => {
  return new Promise((resolve, reject) => {
    try {
      child_process.execSync(
        `pushd ${data_dir} && unzip -o ${filepath} && popd`
      );
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const findShapes = () => {
  return new Promise((resolve, reject) => {
    try {
      const files = fs.readdirSync(data_dir);
      const shapes = files
        .filter((file) => file.indexOf(".shp") === file.length - 4)
        .map((filename) => `${data_dir}/${filename}`);
      resolve(shapes);
    } catch (error) {
      reject(error);
    }
  });
};

const convertToGeoJSON = (shape_path) => {
  return new Promise((resolve, reject) => {
    const geojson_path = shape_path.replace(/\.shp$/, ".geojson");
    try {
      child_process.execSync(
        `ogr2ogr -t_srs "urn:ogc:def:crs:OGC:1.3:CRS84" -f geojson ${geojson_path} ${shape_path}`
      );
      resolve(geojson_path);
    } catch (error) {
      reject(error);
    }
  });
};

const convertToDissolvedGeoJSON = (shape_path) => {
  return new Promise((resolve, reject) => {
    const geojson_path = shape_path.replace(/\.shp$/, ".cities.geojson");
    const table_name = path.basename(shape_path, ".shp");
    removeData(geojson_path).then(() => {
      try {
        child_process.execSync(
          `ogr2ogr -t_srs "urn:ogc:def:crs:OGC:1.3:CRS84" -f geojson ${geojson_path} ${shape_path} -dialect sqlite -sql "select ST_union(Geometry), PREF, CITY, PREF_NAME, CITY_NAME from ${table_name} group by CITY"`
        );
        const geojson = JSON.parse(fs.readFileSync(geojson_path));
        delete geojson.name;
        fs.writeFileSync(geojson_path, JSON.stringify(geojson));
        resolve(geojson_path);
      } catch (error) {
        reject(error);
      }
    });
  });
};

const convertToNDGeoJSON = (geojson_path) => {
  return new Promise((resolve, reject) => {
    const ndgeojson_path = geojson_path.replace(/\.geojson$/, ".ndgeojsons");
    try {
      const geojson = JSON.parse(
        fs.readFileSync(geojson_path).toString("utf-8")
      );
      const ndgeojson = geojson.features
        .map((feature) => {
          return JSON.stringify({
            name: geojson.name,
            csr: geojson.csr,
            ...feature,
          });
        })
        .join("\n");
      fs.writeFileSync(ndgeojson_path, ndgeojson);
      resolve(ndgeojson_path);
    } catch (error) {
      reject(error);
    }
  });
};

// just copy
const createCityLayers = (ndgeojsons_path) => {
  return new Promise((resolve, reject) => {
    try {
      const ndgeojsons = fs.readFileSync(ndgeojsons_path).toString("utf-8");
      const prefCode = JSON.parse(ndgeojsons.split("\n")[0]).properties.PREF;
      const target_file = `${dest_dir}/${prefCode}.ndgeojsons`;
      fs.writeFileSync(target_file, ndgeojsons);
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
};

const createSmallAreaLayers = (ndgeojsons_path) => {
  return new Promise((resolve, reject) => {
    try {
      const ndgeojsons = fs
        .readFileSync(ndgeojsons_path)
        .toString("utf-8")
        .split("\n")
        .map((line) => JSON.parse(line));

      Promise.all(
        ndgeojsons.map((ndgeojson) => {
          const {
            properties: { PREF: prefCode, CITY: cityCode },
          } = ndgeojson;
          const target_path = `${dest_dir}/${prefCode}`;
          const target_file = `${target_path}/${cityCode}.ndgeojsons`;
          return mkdirp(target_path)
            .then(() => removeData(target_file))
            .then(() => {
              fs.appendFileSync(
                target_file,
                JSON.stringify(ndgeojson) + "\n",
                "utf-8"
              );
              return target_file;
            });
        })
      ).then(resolve);
    } catch (error) {
      reject(error);
    }
  });
};

const main = async () => {
  await removeData(data_dir);
  await removeData(dest_dir);
  await mkdirp(data_dir);
  await mkdirp(dest_dir);

  const prefCodes = Array(47)
    .fill(0)
    .map((_0, index) => (index + 1).toString().padStart(2, "00"));

  for (const prefCode of prefCodes) {
    process.stdout.write(`downloading: ${prefCode}\n`);
    const url = `https://www.e-stat.go.jp/gis/statmap-search/data?dlserveyId=A002005212015&code=${prefCode}&coordSys=2&format=shape&downloadType=5`;
    await download(url, prefCode).then(unzip);
  }

  const shape_paths = await findShapes();

  const small_area_geojson_paths = await Promise.all(
    shape_paths.map(convertToGeoJSON)
  );
  const city_geojson_paths = await Promise.all(
    shape_paths.map(convertToDissolvedGeoJSON)
  );

  const city_ndgeojson_paths = await Promise.all(
    city_geojson_paths.map(convertToNDGeoJSON)
  );
  const small_area_ndgeojson_paths = await Promise.all(
    small_area_geojson_paths.map(convertToNDGeoJSON)
  );

  await Promise.all(city_ndgeojson_paths.map(createCityLayers));
  await Promise.all(small_area_ndgeojson_paths.map(createSmallAreaLayers));
};
main();
