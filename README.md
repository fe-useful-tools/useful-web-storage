<p align="center">
  <h1 align="center"> USEFUL-STORAGE </h1>
</p>
<p align="center">
  <img alt="license" src="https://img.shields.io/npm/l/useful-storage?style=flat-square">
  <img alt="releases" src="https://badgen.net/github/releases/fe-useful-tools/useful-storage?style=flat-square">
  <img alt="GitHub package.json version" src="https://img.shields.io/github/package-json/v/fe-useful-tools/useful-storage?style=flat-square&colorB=51C838">
  <img alt="downloads" src="https://img.shields.io/npm/dt/@useful/storage?style=flat-square">
  <img alt="pkg dependents" src="https://badgen.net/github/dependents-pkg/fe-useful-tools/useful-storage?style=flat-square">
  <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/useful-storage?style=flat-square">
</p>

# useful-storage
Simple and powerful storage library.

## :package: Install

```shell
$ yarn add @useful/storage
# or
$ npm install --save @useful/storage
```

## :pencil: Usage

### Browser

```html
<script src="lib/useful-storage/index.min.js"></script>
<script>
  console.log('usefulStorage', usefulStorage);
</script>
```

### Typescript

```typescript
 import { storage, session } from '@useful/storage';

 // localStorage
 storage.set(key,val)

 storage.get(key, def)

 // sessionStorage
 session.set(key, val)

 session.get(key, def)
```

## :bulb: API

### `set: (key: string, val: any, exp?: number | Date) => any`

When passed a key name and value, will add that key to the storage, or update that key's value if it already exists.

When `exp` is a number, it indicates how many days will expire. The default expiration time is **zero on the next day**.

### `get: <T>(key: string) => T | null`

When the obtained value does not expire, return the value.

### `has: (key: string) => boolean`

Determine storage has the key.

### `remove: (key: string) => void`

When passed a key name, will remove that key from the storage.

### `clear: () => void`

When invoked, will empty all keys out of the storage.

### `getAll: () => Record<string, any> | undefined`

Get all the storages.

### `forEach: (callback: (key: string, val: any) => void) => void`

forEach the storages and call the callback function with each storage.

### `length: () => number`

Returns an integer representing the number of data items stored in the Storage object.

### `key: (n: number) => string | null`

Get the name of the nth key in the storage.

## :rocket: Download

Download the latest version of useful-storage at https://github.com/fe-useful-tools/useful-storage/releases

## License

useful-storage is licensed under a [MIT License](https://github.com/fe-useful-tools/useful-storage/blob/master/LICENSE).
