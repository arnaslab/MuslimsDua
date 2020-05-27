import {
    LOAD_DATA,
    LOAD_DATA_SUCCESS,
    LOAD_DATA_ERROR,
    EDIT_DUA,
    LOAD_SETTING_SUCCESS,
    EDIT_SETTING
} from './constant';
import { 
    loadData as loadStorageData, 
    updateData as updateStorageData,
    editData as editStorageData,
    loadSetting as loadStorageSetting,
    editSetting as editStorageSetting
} from './storage';

export const loadData = () => dispatch => {
    console.log("action loadData");
    dispatch({ type: LOAD_DATA });
    loadStorageData().then(data => {
        dispatch({ type: LOAD_DATA_SUCCESS, ...data });
    }).catch(err => {
        console.log(err);
        dispatch({ type: LOAD_DATA_ERROR });
    });
}

export const updateData = () => dispatch => {
    console.log("updateData action");
    updateStorageData().then(data => {
        dispatch({ type: LOAD_DATA_SUCCESS, ...data });
    }).catch(err => console.log(err));
}

export const editDua = (id, name, value) => {
    console.log("action editData");
    editStorageData("duas", id, name, value);
    return { type: EDIT_DUA, id, name, value }
}

export const loadSetting = () => dispatch => {
    console.log("action loadSetting");
    loadStorageSetting().then(setting => {
        dispatch({ type: LOAD_SETTING_SUCCESS, setting });
    }).catch(err => console.log(err));
}

export const editSetting = (name, value) => {
    console.log("action editSetting");
    editStorageSetting(name, value);
    return { type: EDIT_SETTING, name, value };
}