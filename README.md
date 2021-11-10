# cdn.geolonia.com

## build

| commands                 | description |
| :----------------------- | :------------- |
| `npm run build:tiles`    | ベクトルタイルをビルド |
| `npm run build:address`  | 最新の「Geolonia 住所データ」を使って住所 API をビルド |
| `npm run build:styles`   | Geolonia の style.json をビルド |
| `npm run build:embed`    | Embed API をビルド |
| `npm run build:plugins`  | Embed API のプラグインをビルド |
| `npm run build:geocoder` | geocoder API ([Community Geocoder](https://github.com/geolonia/community-geocoder)) をビルド |

### スタイルの国際化について

`npm run build:styles` の実行の際に一部のラベルに関するプロパティが変更され en.json と ja.json が生成されます。国際化の対象にしたいレイヤーについては以下のレイアウトプロパティを指定してください。

```json
{
  "layout": {
    "text-field": "{name}"
  }
}
```

## tiles hosted here

```
$ bin/build-tiles-from-mbtiles.sh <path-to-mbtiles> <identifier>
```

`<identifier>` refers to the directory name in `public/tiles/<identifier>/`.

Requirements: mb-util (tippecanoe), find, gunzip.
