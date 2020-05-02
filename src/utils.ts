const class2type = {};
const { toString } = class2type;

export const serialize = (val: any) => JSON.stringify(val);

export const noop = () => {};

export const deserialize = (val: string | null) => {
  if (val === null) return null;

  try {
    return JSON.parse(val);
  } catch (e) {
    // not using @useful/storage
    return val || null;
  }
};

export const isPlainObject = (obj: any) => {
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false;
  }
  return true;
};

export const setStorage = (params: {
  key: string,
  val: any,
  exp: Date,
  storage: Storage,
}) => {
  const {
    key,
    val,
    exp,
    storage,
  } = params;

  storage.setItem(key, serialize({
    data: val,
    expires: exp.getTime(),
    usefulStorage: true,
  }));
};

export const getStorage = <T>(params: {
  key: string,
  storage: Storage,
}): T | null => {
  const {
    key,
    storage,
  } = params;

  const storageData = deserialize(storage.getItem(key));

  // Data is stored using `@useful/storage`
  if (isPlainObject(storageData) && storageData.usefulStorage && storageData.expires) {
    if (new Date().getTime() - storageData.expires >= 0) {
      storage.removeItem(key);
      return null;
    }
    return storageData.data;
  }
  return storageData;
};
