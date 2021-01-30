// import 'react-native-get-random-values';
import {
  fetchRecord,
  updateRecord,
  removeCategory,
  insertRecord,
} from '../../helpers/db';

import {
  RECORD_FETCH_SUCCESS,
  RECORD_FETCH_ROLLBACK,
  RECORD_CREATE,
  RECORD_CREATE_ROLLBACK,
  RECORD_CREATE_SUCCESS,
  RECORD_DELETE,
  RECORD_UPDATE,
  RECORD_UPDATE_ROLLBACK,
  RECORD_UPDATE_SUCCESS,
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
  var recordData = {
    id: id,
    amount: amount,
    date: date,
    categoryId: categoryId,
    payFrom: payFrom,
    payTo: payTo,
    description: description,
    place: place,
    attachment: attachment,
  };

  if (description === '') {
    return (dispatch) => {
      dispatch({
        type: RECORD_UPDATE_ROLLBACK,
        payload: 'Record title is required!',
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: RECORD_UPDATE,
      payload: recordData,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/records/${id}`,
            method: 'PUT',
            data: recordData,
          },
          commit: {type: RECORD_UPDATE_SUCCESS, meta: {id}},
          rollback: {type: RECORD_UPDATE_ROLLBACK, meta: {id}},
        },
      },
    });
    callback();
  };
};

export const deleteRecord = ({id, callback}) => {
  return (dispatch) => {
    dispatch({
      type: RECORD_DELETE,
      payload: id,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/records/${id}`,
            method: 'DELETE',
          },
          commit: {},
          rollback: {},
        },
      },
    });
    callback();
  };
};
