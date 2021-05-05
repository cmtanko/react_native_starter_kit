import {insertBackup, fetchBackup, resetData} from '../../helpers/db';

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

export const resetDatabase = (accounts, categories, records, callback) => {
  return async (dispatch) => {
    try {
      const dbResult = await resetData(accounts, categories, records);
      dispatch({type: 'database_reset_success', payload: {}});
      callback();
    } catch (error) {
      throw error;
    }
  };
};
