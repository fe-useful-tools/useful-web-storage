import { setStorage, getStorage } from './utils';

export interface IUsefulStorage {
  disabled: boolean;
  storage?: Storage | null;
  set: (key: string, val: any, exp?: number | Date) => any;
  get: <T>(key: string) => T | null;
  has: (key: string) => boolean;
  remove: (key: string) => void;
  clear: () => void;
  getAll: () => Record<string, any> | undefined;
  forEach: (callback: (key: string, val: any) => void) => void;
  length: () => number;
  key: (n: number) => string | null;
}

const isServer = typeof window === 'undefined';

// @ts-ignore
const storage: IUsefulStorage = {
  storage: !isServer ? window.localStorage : null
};

// @ts-ignore
const session: IUsefulStorage = {
  storage: !isServer ? window.sessionStorage : null
};

const commonAPI: IUsefulStorage = {
  disabled: false,
  /**
   * When passed a key name and value, will add that key to the storage,
   * or update that key's value if it already exists
   * @param key
   * @param val
   * @param exp expire date (The default expiration time is zero in the next day)
   */
  set(key, val, exp) {
    if (val === null || this.disabled || !this.storage) return;
    const expiresDate = new Date();

    if (typeof exp === 'number') {
      expiresDate.setTime(expiresDate.getTime() + exp * 24 * 60 * 60 * 1000);
    } else if (!exp || !(exp instanceof Date)) {
      const hours = expiresDate.getHours();
      const minutes = expiresDate.getMinutes();
      const seconds = expiresDate.getSeconds();
      const pastMilliseconds =
        hours * 60 * 60 * 1000 + minutes * 60 * 1000 + seconds * 1000;
      expiresDate.setTime(
        expiresDate.getTime() + 24 * 60 * 60 * 1000 - pastMilliseconds
      );
    }

    setStorage({
      key,
      val,
      exp: exp instanceof Date ? exp : expiresDate,
      storage: this.storage
    });

    return val;
  },

  /**
   * When the obtained value does not expire, return the value
   * @param key
   */
  get<T>(key) {
    if (this.disabled || !this.storage) return null;
    return getStorage<T>({
      key,
      storage: this.storage
    });
  },

  /**
   * Determine storage has the key
   */
  has(key) {
    return this.get(key) !== null;
  },

  /**
   * When passed a key name, will remove that key from the storage
   * @param key
   */
  remove(key) {
    if (this.disabled || !this.storage) return;
    this.storage.removeItem(key);
  },

  /**
   * When invoked, will empty all keys out of the storage
   */
  clear() {
    if (this.disabled || !this.storage) return;
    this.storage.clear();
  },

  /**
   * Get all the storages
   */
  getAll() {
    if (this.disabled || !this.storage) return;
    const ret = {};
    this.forEach((key, val) => (ret[key] = val));
    return ret;
  },

  /**
   * forEach the storages and call the callback function with each storage
   * @param callback
   */
  forEach(callback) {
    if (this.disabled || !this.storage) return;
    for (let i = 0; i < this.length(); i += 1) {
      const key = this.storage.key(i);
      if (key) {
        callback(key, this.get(key));
      }
    }
  },

  /**
   * Returns an integer representing the number of data items stored in the Storage object
   */
  length() {
    if (this.disabled || !this.storage) return 0;
    return this.storage.length;
  },

  /**
   * Get the name of the nth key in the storage
   * @param n
   */
  key(n: number) {
    if (this.disabled || !this.storage) return null;
    return this.storage.key(n);
  }
};

Object.assign(storage, commonAPI);
Object.assign(session, commonAPI);

// [Testing for availability](https://gist.github.com/paulirish/5558557)
try {
  const testKey = '__CHECK_BROWSER_STORAGE__';
  storage.set(testKey, testKey);
  if (storage.get(testKey) !== testKey) {
    storage.disabled = true;
  }
  storage.remove(testKey);
} catch (e) {
  if (
    typeof DOMException === 'undefined' ||
    // eslint-disable-next-line no-undef
    !(e instanceof DOMException) ||
    // everything except Firefox
    (e.code !== 22 &&
      // Firefox
      e.code !== 1014 &&
      // test name field too, because code might not be present
      // everything except Firefox
      e.name !== 'QuotaExceededError' &&
      // Firefox
      e.name !== 'NS_ERROR_DOM_QUOTA_REACHED') ||
    // acknowledge QuotaExceededError only if there's something already stored
    !storage.storage ||
    storage.length() === 0
  ) {
    storage.disabled = true;
  }
}

export default {
  storage,
  session
};
