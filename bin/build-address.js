const fetch = require("node-fetch");
const fs = require("fs");
const parse = require("csv-parse");
const basePath = `${__dirname}/../public/address/japan`;
const mkdirp = require("mkdirp");
const { removeGun } = require('./lib/address')

const main = async () => {
  mkdirp.sync(basePath);
  const content = await fetch(
    "https://github.com/geolonia/japanese-addresses/raw/master/data/latest.csv"
  ).then((res) => res.text());

  const prefMap = {};
  const cityMap = {};
  const smallAreaMap = {};
  const parser = parse(content, { delimiter: "," });

  parser.on("readable", () => {
    const header = parser.read();

    let record;
    while ((record = parser.read())) {
      const item = record.reduce((prev, item, index) => {
        prev[header[index]] = item;
        return prev;
      }, {});
      const prefCode = item.都道府県コード;
      const prefName = item.都道府県名;
      const cityCode = item.市区町村コード;
      const smallAreaCode = item.大字町丁目コード;

      if (!prefMap[prefCode]) {
        fs.mkdirSync(`${basePath}/${prefName}`);
        prefMap[prefCode] = {
          都道府県名: item.都道府県名,
          都道府県名カナ: item.都道府県名カナ,
        };
      }

      if (!cityMap[prefCode]) {
        cityMap[prefCode] = {};
      }
      if (!cityMap[prefCode][cityCode]) {
        // 大字町丁目ごとに個別の JSON を生成する場合、フォルダを作成する
        // fs.mkdirSync(`${basePath}/${prefCode}/${cityCode}`);
        cityMap[prefCode][cityCode] = {
          都道府県名: item.都道府県名,
          市区町村名: item.市区町村名,
        };
      }

      if (!smallAreaMap[prefCode]) {
        smallAreaMap[prefCode] = {};
      }
      if (!smallAreaMap[prefCode][cityCode]) {
        smallAreaMap[prefCode][cityCode] = {};
      }
      smallAreaMap[prefCode][cityCode][smallAreaCode] = item;
    }
  });

  parser.on("error", (err) => {
    console.error(err);
    process.exit(1);
  });

  parser.on("end", () => {
    const allPrefs = Object.values(prefMap);
    const prefs = []
    for (let i = 0; i < allPrefs.length; i++) {
      prefs.push(allPrefs[i].都道府県名)
    }
    fs.writeFileSync(`${basePath}.json`, JSON.stringify(prefs));

    const allCities = Object.keys(cityMap).flatMap((prefCode) => {
      const allCitiesInAPref = Object.values(cityMap[prefCode]);
      const prefName = prefMap[prefCode].都道府県名
      const cities = []
      for (let i = 0; i < allCitiesInAPref.length; i++) {
        cities.push(allCitiesInAPref[i].市区町村名)
      }
      fs.writeFileSync(
        `${basePath}/${prefName}.json`,
        JSON.stringify(cities)
      )

      return allCitiesInAPref
    });

    fs.writeFileSync(`${basePath}/市区町村.json`, JSON.stringify(allCities));

    Object.keys(smallAreaMap).map((prefCode) => {
      Object.keys(smallAreaMap[prefCode]).map((cityCode) => {
        const allSmallAreas = Object.values(smallAreaMap[prefCode][cityCode]);
        const transformedAllSmallAreas = allSmallAreas.map((smallArea) => {
          const result = { ...smallArea };
          return result.大字町丁目名
        });
        const prefName = prefMap[prefCode].都道府県名
        const cityName = removeGun(cityMap[prefCode][cityCode].市区町村名)
        fs.writeFileSync(
          `${basePath}/${prefName}/${cityName}.json`,
          JSON.stringify(transformedAllSmallAreas)
        );
      });
    });
  });
};

main();
