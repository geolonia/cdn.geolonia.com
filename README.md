# cdn.geolonia.com

## build

| commands                 | description |
| :----------------------- | :------------- |
| `npm run build:tiles`    | ベクトルタイルをビルド |
| `npm run build:address`  | 最新の「Geolonia 住所データ」を使って住所 API をビルド |
| `npm run build:style`    | Geolonia の style.json をビルド |
| `npm run build:embed`    | Embed API をビルド |
| `npm run build:geocoder` | geocoder API をビルド |

## API

### Address

#### List prefectures

```
GET /address/japan.json
{
  都道府県コード: string;
  都道府県名: string;
  都道府県名カナ: string;
  都道府県名ローマ字: string;
}[]
```

#### List cities

```
GET /address/japan/{prefCode}.json
{
  市区町村コード: string;
  市区町村名: string;
  市区町村名カナ: string;
  市区町村名ローマ字: string;
  都道府県コード: string;
  都道府県名: string;
  都道府県名カナ: string;
  都道府県名ローマ字: string;
}[]
```

#### List small areas

```
GET /address/japan/{prefCode}/{cityCode}.json
{
  大字町丁目コード: string;
  大字町丁目名: string;
  市区町村コード: string;
  市区町村名: string;
  市区町村名カナ: string;
  市区町村名ローマ字: string;
  都道府県コード: string;
  都道府県名: string;
  都道府県名カナ: string;
  都道府県名ローマ字: string;
  経度: number;
  緯度: number;
}
```
