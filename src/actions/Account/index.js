import {
  fetchAccount,
  insertAccount,
  removeAccount,
  updateAccount,
  insertAccounts,
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
        payload: dbResult.sort((a, b) => {
          return b.isFavorite - a.isFavorite;
        }),
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

export const selectAccount = (value) => {
  return {
    type: 'SELECT_ACCOUNT',
    payload: value,
  };
};

export const selectCategory = (value) => {
  return {
    type: 'SELECT_CATEGORY',
    payload: value,
  };
};

export const selectDate = (value) => {
  return {
    type: 'SELECT_DATE',
    payload: value,
  };
};

export const predictedCategoryId = (value) => {
  return {
    type: 'PREDICTED_CATEGORY_ID',
    payload: value,
  };
};

export const predictedAccountId = (value) => {
  return {
    type: 'PREDICTED_ACCOUNT_ID',
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
        callback(accountData);
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
  isFavorite,
  callback,
}) => {
  return async (dispatch) => {
    try {
      var accountData = {
        id: id,
        icon: icon,
        openingBalance: parseFloat(openingBalance),
        title: title,
        isFavorite: isFavorite,
        type: type,
      };

      if (title === '') {
        dispatch({
          type: ACCOUNT_UPDATE_ROLLBACK,
          payload: 'Account title is required!',
        });
      } else {
        await updateAccount(
          id,
          title,
          type,
          openingBalance,
          icon,
          isFavorite,
          callback,
        );
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

export const addAccounts = (sqlQuery) => {
  return async (dispatch) => {
    try {
      await insertAccounts(sqlQuery);
      dispatch({type: ACCOUNT_CREATE, payload: {}});
    } catch (error) {
      throw error;
    }
  };
};
