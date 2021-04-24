import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  EDIT_DUA,
  LOAD_SETTING_SUCCESS,
  EDIT_SETTING,
  STATUS_IDLE,
  STATUS_LOAD,
  STATUS_READY,
  STATUS_ERROR,
  STATUS_UPDATED
} from './constant';
import { parseLangTitle } from './app';

const reducer = (state = {
  status: STATUS_IDLE,
  tags: null, 
  duas: null,
  themes: null,
  setting: {},
}, action) => {
  switch (action.type) {
    case LOAD_DATA:
      return {
        ...state,
        status: STATUS_LOAD
      }
    case LOAD_DATA_SUCCESS:
      return {
        ...state,
        status: state.status === STATUS_READY ? STATUS_UPDATED : STATUS_READY,
        tags: action.tags.sort((a, b) => a.sort - b.sort),
        duas: action.duas
          .sort((a, b) => a.sort - b.sort)  
          .map(dua => ({ ...dua, title: parseLangTitle(dua.title) })),
        themes: action.themes.sort((a, b) => a.sort - b.sort)
      }
    case LOAD_DATA_ERROR:
      return {
        ...state,
        status: STATUS_ERROR
      }
    case EDIT_DUA:
      const key = state.duas.findIndex(dua => dua.id === action.id);
      if (key > -1) {
        return {
          ...state,
          duas: [
            ...state.duas.slice(0, key),
            { ...state.duas[key], [action.name]: action.value },
            ...state.duas.slice(key + 1, state.duas.length)
          ]
        }
      } else {
        return state;
      }
    case LOAD_SETTING_SUCCESS:
      return {
        ...state,
        setting: action.setting || {}
      }
    case EDIT_SETTING:
      return {
        ...state,
        setting: {
          ...state.setting,
          [action.name]: action.value
        }
      }
    default:
      return state;
  }
};

export default reducer;