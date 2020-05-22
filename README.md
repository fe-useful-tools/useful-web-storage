English | [简体中文](./docs/zh-cn/README.zh-CN.md) | [正體中文](./docs/zh-tw/README.zh-TW.md)

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
Simple and powerful storage library.

## :sparkles: Features

- :zap: Lightweight, only 1kb after minified and gzipped
- :clock12: Support setting expiration time, the default expiration time is zero on the next day
- 🛡 Written in TypeScript with predictable static types
- :package: No package dependencies

## :package: Installation

Using npm or yarn

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

## :pencil: Usage

### Browser

Add script tags in your browser and use the global variable `usefulWebStorage`.

```html
<script src="https://unpkg.com/useful-web-storage@1.0.2/lib/index.min.js"></script>
<script>
  const storage = usefulWebStorage.storage;
  storage.clearExpiredStorage();
  storage.set('name', 'useful-web-storage', storage.permanent);
  storage.get('name');
</script>
```

### Use with RequireJS

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

When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

When `exp` is a number, it indicates how many days will expire. The default expiration time is **zero on the next day**. If you want permanent storage, please manually pass in [`storage.permanent`](#permanent-date).

### `get: <T>(key: string) => T | null`

When the obtained value does not expire, return the value. In the `TypeScript` project, you can also specify the type of the return value.

### `has: (key: string) => boolean`

Determine storage has the key.

### `touch: (key: string, exp: number | Date) => void`

Set a new timeout for the stored value (not expired) based on the current time.

### `remove: (key: string) => void`

When passed a key name, will remove that key from the storage.

### `clear: () => void`

When invoked, will empty all keys out of the storage.

### `clearExpiredStorage: () => void;`

Only clear expired storage.

### `getAll: () => Record<string, any> | undefined`

Get all the storages.

### `forEach: (callback: (key: string, val: any) => void) => void`

forEach the storages and call the callback function with each storage.

### `isSupported: () => boolean`

Check if the browser supports localstorage. If not supported, nothing will be done.

### `length: () => number`

Returns an integer representing the number of data items stored in the Storage object.

### `key: (n: number) => string | null`

Get the name of the nth key in the storage.

### `permanent: Date`

Permanently store constant.

## :rocket: Download

Download the latest version of useful-web-storage at https://github.com/fe-useful-tools/useful-web-storage/releases

## License

useful-web-storage is licensed under a [MIT License](https://github.com/fe-useful-tools/useful-web-storage/blob/master/LICENSE).
