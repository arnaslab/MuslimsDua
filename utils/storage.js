import { AsyncStorage } from 'react-native';

export const clearStorage = () => AsyncStorage.clear();

const getStorage = (key) => AsyncStorage.getItem(key)
  .then(res => JSON.parse(res));

const setStorage = (key, value) => AsyncStorage.setItem(key, JSON.stringify(value))
  .then(() => console.log(`Successfuly set ${key}`));

const mergeStorage = (key, value) => AsyncStorage.mergeItem(key, JSON.stringify(value))
  .then(() => console.log(`Successfuly merge ${key}`));

const checkUpdate = (timestamp) =>
  fetch(`https://us-central1-muslimsdua.cloudfunctions.net/checkUpdate?timestamp=${timestamp}`)
  .then(response => response.json());

export const loadData = async () => {
  const data = await getStorage('data');
  if (data) {
    return data;
  } else {
    const cloudData = await checkUpdate(0);
    setStorage('data', cloudData);
    return cloudData;
  }
}

const mergeData = (prevData, newData) => newData.reduce((acc, data) => {
  const key = acc.findIndex(item => item.id === data.id);
  if (key > -1) {
    return [
      ...acc.slice(0, key),
      data,
      ...acc.slice(key+1, acc.length)
    ]
  } else {
    return [ ...acc, data ]
  }
}, prevData);

const mergeAllData = (prevData, newData) =>
  Object.keys(prevData).reduce((acc, key) => ({ ...acc, [key]: mergeData(prevData[key], newData[key]) }), {});

export const updateData = async () => {
  console.log("updating storage data");
  const data = await getStorage('data');
  const timestamp = Object.keys(data).reduce((acc, key) => data[key]
      .reduce(((acc, item) => item.timestamp > acc ? item.timestamp : acc), acc), 0);
  const cloudData = await checkUpdate(timestamp);
  const newData = mergeAllData(data, cloudData);
  setStorage('data', newData);
  return newData;
}

export const editData = async (storageKey, id, name, value) => {
  const data = (await getStorage('data'))[storageKey];
  const key = data.findIndex(item => item.id === id);
  if (key > -1) {
    await mergeStorage('data', { [storageKey]: [
      ...data.slice(0, key),
      { ...data[key], [name]: value },
      ...data.slice(key+1, data.length)
    ]})
  }
}

export const loadSetting = async () => {
  const setting = await getStorage("setting");
  if (setting) {
    return setting;
  } else {
    setStorage("setting", {});
    return {};
  }
}

export const editSetting = (name, value) => mergeStorage('setting', { [name]: value });