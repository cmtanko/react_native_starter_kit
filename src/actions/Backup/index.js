import {
  fetchUser,
  resetData,
  wipeData,
  insertUser,
  fetchBackup,
  insertBackup,
  fetchSetting,
  insertSetting,
} from '../../helpers/db';

export const getBackup = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchBackup();
      dispatch({
        type: 'backup_fetch_success',
        payload: dbResult,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addBackup = ({title, date, callback}) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertBackup(title, date);
      const backupData = {
        id: dbResult.insertId.toString(),
        title: title,
        date: date,
      };
      dispatch({type: 'backup_created_success', payload: backupData});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const wipeDatabase = (callback) => {
  return async (dispatch) => {
    try {
      await wipeData();
      dispatch({type: 'database_wipe_success', payload: {}});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const resetDatabase = (accounts, categories, records, callback) => {
  return async (dispatch) => {
    try {
      await resetData(accounts, categories, records);
      dispatch({type: 'database_reset_success', payload: {}});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const getUserInfo = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchUser();
      dispatch({
        type: 'user_fetch_success',
        payload: dbResult,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const getSettings = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchSetting();
      dispatch({type: 'setting_fetch_success', payload: dbResult});
    } catch (error) {
      throw error;
    }
  };
};

export const setSettings = ({
  id,
  lockscreen,
  notification,
  currency,
  callback,
}) => {
  return async (dispatch) => {
    try {
      await insertSetting(id, lockscreen, notification, currency);
      dispatch({
        type: 'setting_add_success',
        payload: {
          id,
          lockscreen,
          notification,
          currency,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addUserInfo = (fullName, email, photo, token, callback) => {
  return async (dispatch) => {
    try {
      await insertUser(fullName, email, photo, token);
      dispatch({type: 'user_insert_success', payload: {}});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const setLockedState = (value) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: 'lock_insert_success',
        payload: value,
      });
    } catch (error) {
      throw error;
    }
  };
};
