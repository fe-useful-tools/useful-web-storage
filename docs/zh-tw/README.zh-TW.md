<p align="center">
  <h1 align="center"> USEFUL-WEB-STORAGE </h1>
</p>
<p align="center">
  <img alt="license" src="https://img.shields.io/npm/l/useful-web-storage?style=flat-square">
  <img alt="releases" src="https://badgen.net/github/releases/fe-useful-tools/useful-web-storage?style=flat-square">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/fe-useful-tools/useful-web-storage?style=flat-square&colorB=51C838">
  <img alt="downloads" src="https://img.shields.io/npm/dt/useful-web-storage?style=flat-square">
  <img alt="pkg dependents" src="https://badgen.net/github/dependents-pkg/fe-useful-tools/useful-web-storage?style=flat-square">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/useful-web-storage?style=flat-square">
</p>

# useful-web-storage
簡單且强大的本地存儲庫

## :sparkles: 特性

- :zap: 輕量，壓縮後僅1kb
- :clock12: 支援設定過期時間，默認過期時間為次日零點
- 🛡 使用 `TypeScript` 開發，提供完整的類型定義檔案
- :package: 無第三方包依賴

## :package: 安裝

使用 npm 或 yarn 安裝

```shell
$ npm install --save useful-web-storage
```

```shell
$ yarn add useful-web-storage
```

umd

```html
<script src="https://unpkg.com/useful-web-storage@${version}/lib/index.min.js"></script>
```

## :pencil: 使用

### 瀏覽器

在瀏覽器中使用 `script` 標籤直接引入檔案，並使用全域變數 `usefulWebStorage`。

```html
<script src="https://unpkg.com/useful-web-storage@1.0.2/lib/index.min.js"></script>
<script>
  const storage = usefulWebStorage.storage;
  storage.clearExpiredStorage();
  storage.set('name', 'useful-web-storage', storage.permanent);
  storage.get('name');
</script>
```

### 在 RequireJS 中使用

```javascript
define(['useful-web-storage'], function(usefulWebStorage) {
  usefulWebStorage.storage.set('name', 'useful-web-storage');
});
```

### Typescript

```typescript
import { storage, session } from 'useful-web-storage';

interface IUserInfo {
  name: string;
  age: number;
  hasPermission: boolean;
  hobby: string[];
}

const userInfo: IUserInfo = {
  name: 'kingmui',
  age: 18,
  hasPermission: true,
  hobby: ['sleep', 'music'],
}

// localStorage
storage.set('userInfo', userInfo, storage.permanent);
const user = storage.get<IUserInfo>('userInfo');

// sessionStorage
storage.set('userInfo', userInfo);
session.get<IUserInfo>('userInfo');
```

## :bulb: API

### `set: (key: string, val: any, exp?: number | Date) => any`

當傳入 `key` 及 `value` 的值， 會在 `storage` 裡新增此 `key` 及 `value` 值，若 `key` 已存在，則會把值更新成傳入的 `value`。

當傳入的 `exp` 為 `number` 類型時，表示多少天后將過期。默認過期時間為次日零點。如果你想要永久存儲，請手動傳入 [`storage.permanent`](#permanent-date)。

### `get: <T>(key: string) => T | null`

當傳入一 `key` 值， 會返回 `storage` 裡此 `key` 值對應的 `value`（未超時）。在 `TypeScript` 項目中，你還可以顯示指定該返回值類型。

### `has: (key: string) => boolean`

檢測 `key` 對應的值（未過期）是否存在。

### `touch: (key: string, exp: number | Date) => void`

為指定的 `key` （未過期）以當前時間為基準設定新的超時時間。

### `remove: (key: string) => void`

从 `storage` 裡删除指定 `key` 的值。

### `clear: () => void`

清空本地存儲。

### `clearExpiredStorage: () => void;`

相比 `clear`，該方法僅會清除**已過期**的值。

### `getAll: () => Record<string, any> | undefined`

獲取所有本地存儲的值。

### `forEach: (callback: (key: string, val: any) => void) => void`

遍歷 `storage` 裡的值，為每個值調用一次 `callback`。

### `isSupported: () => boolean`

檢測瀏覽器是否支援本地存儲。如果不支援，將不會執行任何操作。

### `length: () => number`

返回一數字，代表儲存在 `Storage` 中的物件的數量。

### `key: (n: number) => string | null`

當傳入一數字 `n`, 會返回 `storage` 裡第 `n` 個值的 `key` 值。

### `permanent: Date`

永久存儲常數。

## :rocket: 下載

你可以在以下連結中下載最新版本的 useful-web-storage https://github.com/fe-useful-tools/useful-web-storage/releases

## 開源協定

useful-web-storage 遵循 [MIT 開源協定](https://github.com/fe-useful-tools/useful-web-storage/blob/master/LICENSE).
