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
        fs.mkdirSync(`${basePath}/${prefCode}`);
        fs.mkdirSync(`${basePath}/${prefName}`);
        prefMap[prefCode] = {
          都道府県コード: item.都道府県コード,
          都道府県名: item.都道府県名,
          都道府県名カナ: item.都道府県名カナ,
          都道府県名ローマ字: item.都道府県名ローマ字,
        };
      }

      if (!cityMap[prefCode]) {
        cityMap[prefCode] = {};
      }
      if (!cityMap[prefCode][cityCode]) {
        // 大字町丁目ごとに個別の JSON を生成する場合、フォルダを作成する
        // fs.mkdirSync(`${basePath}/${prefCode}/${cityCode}`);
        cityMap[prefCode][cityCode] = {
          都道府県コード: item.都道府県コード,
          都道府県名: item.都道府県名,
          都道府県名カナ: item.都道府県名カナ,
          都道府県名ローマ字: item.都道府県名ローマ字,
          市区町村コード: item.市区町村コード,
          市区町村名: item.市区町村名,
          市区町村名カナ: item.市区町村名カナ,
          市区町村名ローマ字: item.市区町村名ローマ字,
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
    allPrefs.sort(
      (prefA, prefB) => prefA.都道府県コード - prefB.都道府県コード
    );
    // 都道府県レベルの情報の一覧の JSON を生成する
    fs.writeFileSync(`${basePath}.json`, JSON.stringify(allPrefs));

    // 都道府県レベルの情報の個別の JSON を生成する
    // allPrefs.forEach((pref) => {
    //   const prefCode = pref.都道府県コード;
    //   fs.writeFileSync(`${basePath}/${prefCode}.json`, JSON.stringify(pref));
    // });

    Object.keys(cityMap).map((prefCode) => {
      const allCities = Object.values(cityMap[prefCode]);
      allCities.sort(
        (cityA, cityB) => cityA.市区町村コード - cityB.市区町村コード
      );
      const prefName = prefMap[prefCode].都道府県名
      // 市区町村レベルの情報の一覧の JSON を生成する
      fs.writeFileSync(
        `${basePath}/${prefCode}.json`,
        JSON.stringify(allCities)
      );
      fs.writeFileSync(
        `${basePath}/${prefName}.json`,
        JSON.stringify(allCities)
      )

      // 市区町村レベルの情報の個別の JSON を生成する
      // allCities.forEach((city) => {
      //   const cityCode = city.市区町村コード;
      //   fs.writeFileSync(
      //     `${basePath}/${prefCode}/${cityCode}.json`,
      //     JSON.stringify(city)
      //   );
      // });
    });
    Object.keys(smallAreaMap).map((prefCode) => {
      Object.keys(smallAreaMap[prefCode]).map((cityCode) => {
        const allSmallAreas = Object.values(smallAreaMap[prefCode][cityCode]);
        allSmallAreas.sort(
          (smallAreaA, smallAreaB) =>
            smallAreaA.大字町丁目コード - smallAreaB.大字町丁目コード
        );
        const transformedAllSmallAreas = allSmallAreas.map((smallArea) => {
          const result = { ...smallArea };
          delete result.緯度
          delete result.経度
          delete result.大字町丁目コード
          return result
        });
        const prefName = prefMap[prefCode].都道府県名
        const cityName = removeGun(cityMap[prefCode][cityCode].市区町村名)
        // 大字町丁目のレベルの住所一覧の JSON を生成する
        fs.writeFileSync(
          `${basePath}/${prefCode}/${cityCode}.json`,
          JSON.stringify(transformedAllSmallAreas)
        );
        fs.writeFileSync(
          `${basePath}/${prefName}/${cityName}.json`,
          JSON.stringify(transformedAllSmallAreas)
        );

        // 大字町丁目レベルの個別の JSON を生成する
        // transformedAllSmallAreas.forEach((smallArea) => {
        //   const smallAreaCode = smallArea.大字町丁目コード;
        //   fs.writeFileSync(
        //     `${basePath}/${prefCode}/${cityCode}/${smallAreaCode}.json`,
        //     JSON.stringify(smallArea)
        //   );
        // });
      });
    });
  });
};

main();
