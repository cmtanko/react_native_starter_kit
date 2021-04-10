import {
  fetchAccount,
  insertAccount,
  removeAccount,
  updateAccount,
} from '../../helpers/db';

import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_CREATE,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_ROLLBACK,
} from '../types';

export const getAccounts = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchAccount();
      dispatch({
        type: ACCOUNT_FETCH_SUCCESS,
        payload: dbResult,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const selectAccountType = (value) => {
  return {
    type: 'CHANGE_ACCOUNT_TYPE',
    payload: value,
  };
};

export const addAccount = ({title, type, openingBalance, icon, callback}) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertAccount(title, type, openingBalance, icon);
      const accountData = {
        id: dbResult.insertId.toString(),
        title: title,
        openingBalance: parseFloat(openingBalance),
        type: type,
        icon: icon,
        balance: 0,
      };

      if (title === '') {
        dispatch({
          type: ACCOUNT_UPDATE_ROLLBACK,
          payload: 'Account title is required!',
        });
      } else {
        dispatch({type: ACCOUNT_CREATE, payload: accountData});
        callback();
      }
    } catch (error) {
      throw error;
    }
  };
};

export const editAccount = ({
  id,
  title,
  openingBalance,
  balance,
  type,
  icon,
  callback,
}) => {
  return async (dispatch) => {
    try {
      var accountData = {
        id: id,
        icon: icon,
        openingBalance: parseFloat(openingBalance),
        title: title,
        type: type,
      };

      if (title === '') {
        dispatch({
          type: ACCOUNT_UPDATE_ROLLBACK,
          payload: 'Account title is required!',
        });
      } else {
        await updateAccount(id, title, type, openingBalance, icon, callback);
        dispatch({
          type: ACCOUNT_UPDATE,
          payload: accountData,
        });
        callback();
      }
    } catch (error) {
      throw error;
    }
  };
};

export const deleteAccount = ({id, callback}) => {
  return async (dispatch) => {
    try {
      await removeAccount(id);

      dispatch({
        type: ACCOUNT_DELETE,
        payload: id,
      });
      callback();
    } catch (error) {
      throw error;
    }
  };
};
