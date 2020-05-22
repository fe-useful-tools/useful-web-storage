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
简单且强大的本地存储库

## :sparkles: 特性

- :zap: 轻量，压缩后仅 1kb
- :clock12: 支持设置过期时间，默认过期时间为次日零点
- 🛡 使用 `TypeScript` 开发，提供完整的类型定义文件
- :package: 无第三方包依赖

## :package: 安装

使用 npm 或 yarn 安装

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

### 浏览器

在浏览器中使用 `script` 标签直接引入文件，并使用全局变量 `usefulWebStorage`。

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

该方法接受一个键名和值作为参数，将会把键值对添加到存储中，如果键名存在，则更新其对应的值。

当传入的 `exp` 为 `number` 类型时，表示多少天后过期。默认过期时间为次日零点。如果你想要永久存储，请手动传入 [`storage.permanent`](#permanent-date)。

### `get: <T>(key: string) => T | null`

该方法接受一个键名作为参数，当对应的值未过期时返回键名对应的值。 在 `TypeScript` 项目中，你还可以显示指定该返回值类型。

### `has: (key: string) => boolean`

检测 `key` 对应的值（未过期）是否存在。

### `touch: (key: string, exp: number | Date) => void`

为指定的 `key` （未过期）以当前时间为基准设置新的超时时间。

### `remove: (key: string) => void`

从本地存储删除指定 `key` 的值。

### `clear: () => void`

清空本地存储。

### `clearExpiredStorage: () => void;`

相比 `clear`，该方法仅会清除**已过期**的值。

### `getAll: () => Record<string, any> | undefined`

获取所有本地存储的值。

### `forEach: (callback: (key: string, val: any) => void) => void`

遍历本地存储的值，为每个值调用 `callback` 回调。

### `isSupported: () => boolean`

检测浏览器是否支持本地存储。如果不支持，将不会执行任何操作。

### `length: () => number`

返回一个整数，表示存储在 `Storage` 对象中的数据项数量。

### `key: (n: number) => string | null`

该方法接受一个数值 `n` 作为参数，并返回存储中的第 `n` 个键名。

### `permanent: Date`

永久存储常量。

## :rocket: 下载

你可以在以下链接中下载最新版本的 useful-web-storage https://github.com/fe-useful-tools/useful-web-storage/releases

## 开源协议

useful-web-storage 遵循 [MIT 开源协议](https://github.com/fe-useful-tools/useful-web-storage/blob/master/LICENSE).
