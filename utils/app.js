import { useMapContext } from './context';
import { loadData, updateData, editDua, loadSetting, editSetting } from './actions';
import {
  STATUS_IDLE,
  STATUS_LOAD,
  STATUS_READY,
  STATUS_UPDATED,
  STATUS_ERROR
} from './constant';

export const useDataContext = () => useMapContext(state => {
  const lang = state.setting.language || 'ind';
  const tags = state.tags && state.tags.map(({ ind, eng, ...rest }) => ({ ...rest, title: { ind, eng }[lang] }))
  const duas = state.duas && state.duas.map(({ title, trans: transliteration, ind, eng, ...rest }) => ({
    ...rest,
    title: title[lang] || title[Object.keys(title)[0]],
    translation: { ind, eng }[lang],
    transliteration
  }));

  return {
    isIdle: state.status === STATUS_IDLE,
    isLoad: state.status === STATUS_LOAD,
    isReady: state.status === STATUS_READY,
    isUpdated: state.status === STATUS_UPDATED,
    isError: state.status === STATUS_ERROR,
    tags,
    duas,
    getDuas: (filter = {}) => {
      const { tagId, isLoved } = filter;
      return duas
        .filter(dua => (!tagId || (dua.tags && dua.tags.includes(tagId))))
        .filter(dua => (!isLoved || dua.isLoved))
    },
    themes: state.themes,
  }
}, dispatch => ({
  loadData: () => dispatch(loadData()),
  updateData: () => dispatch(updateData()),
  setLoved: id => value => dispatch(editDua(id, "isLoved", value))
}))

const getColor = (colorList, id, opacity = 1) =>  {
  const n = colorList.length - 1;
  const x = id % (2 * n);
  const colorId = (x < n) ? x : 2 * n - x;
  const color = colorList[colorId];
  return `rgba(${color.r},${color.g},${color.b},${color.a || opacity})`;
}

export const useSettingContext = () => useMapContext(state => {
  const { themes } = state;
  const { theme, language } = state.setting;
  const activeTheme = themes ? (theme ? themes.find(item => (item.id === theme)) : themes[0]) : {};
  return {
    theme,
    bgColor: activeTheme.bgColor || "#ffffff",
    getColor: (id, opacity) => getColor(activeTheme.colors, id, opacity),
    lang: language || 'ind',
    getTextByLang: (data) => data[language || 'ind']
  }
}, dispatch => ({
  loadSetting: () => dispatch(loadSetting()),
  setTheme: value => dispatch(editSetting("theme", value)),
  setLanguage: value => dispatch(editSetting("language", value))
}))

export const toSentence = text => text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const parseLangTitle = (title) => 
  Object.keys(title).reduce((acc, key) => ({ ...acc, [key]: parseTitle(title[key]) }), {});

const parseTitle = (text, sep = '(', result = []) => {
  if (text !== "") {
    const i = text.indexOf(sep);
    if (i > -1) {
      return parseTitle(text.slice(i+1).trim(), sep === '(' ? ')' : '(', [ ...result, text.slice(0, i).trim() ]);
    } else {
      return [ ...result, text ];
    }
  } else {
    return result;
  }
}

export const combineTitle = (arrayText) => 
  arrayText.reduce((acc, text, key) => acc + (key === 0 ? text : ` (${text})`), "");