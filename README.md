# cdn.geolonia.com

## build

| commands                 | description |
| :----------------------- | :------------- |
| `npm run build:tiles`    | ベクトルタイルをビルド |
| `npm run build:address`  | 最新の「Geolonia 住所データ」を使って住所 API をビルド |
| `npm run build:style`    | Geolonia の style.json をビルド |
| `npm run build:embed`    | Embed API をビルド |
| `npm run build:plugins`  | Embed API のプラグインをビルド |
| `npm run build:geocoder` | geocoder API をビルド |

## tiles hosted here

```
$ bin/build-tiles-from-mbtiles.sh <path-to-mbtiles> <identifier>
```

`<identifier>` refers to the directory name in `public/tiles/<identifier>/`.

Requirements: mb-util (tippecanoe), find, gunzip.
