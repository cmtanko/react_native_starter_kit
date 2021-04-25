// import 'react-native-get-random-values';
import {
  fetchRecord,
  insertRecord,
  updateRecord,
  removeRecord,
} from '../../helpers/db';

import {
  RECORD_FETCH_SUCCESS,
  RECORD_CREATE,
  RECORD_DELETE,
  RECORD_UPDATE,
} from '../types';

import {DEV_URL} from '../../config';

export const getRecords = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchRecord();
      dispatch({
        type: RECORD_FETCH_SUCCESS,
        payload: dbResult,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addRecord = ({
  amount,
  date,
  categoryId,
  payFrom,
  payTo,
  description,
  place,
  attachment,
  callback,
}) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertRecord(
        amount,
        date,
        categoryId,
        payFrom,
        payTo,
        description,
        place,
        attachment,
      );
      const recordData = {
        id: dbResult.insertId.toString(),
        amount,
        date,
        categoryId,
        payFrom,
        payTo,
        description,
        place,
        attachment,
      };
      dispatch({type: RECORD_CREATE, payload: recordData});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const editRecord = ({
  id,
  amount,
  date,
  categoryId,
  payFrom,
  payTo,
  description,
  place,
  attachment,
  callback,
}) => {
  return async (dispatch) => {
    try {
      const dbResult = await updateRecord(
        amount,
        date,
        categoryId,
        payFrom,
        payTo,
        description,
        place,
        attachment,
        id,
      );
      const recordData = {
        id,
        amount,
        date,
        categoryId,
        payFrom,
        payTo,
        description,
        place,
        attachment,
      };
      dispatch({type: RECORD_UPDATE, payload: recordData});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const deleteRecord = ({id, callback}) => {
  return async (dispatch) => {
    try {
      await removeRecord(id);

      dispatch({
        type: RECORD_DELETE,
        payload: id,
      });
      callback();
    } catch (error) {
      throw error;
    }
  };
};
