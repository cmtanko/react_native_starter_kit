// import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Account from '../../services/Account';

import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_FETCH_ROLLBACK,
  ACCOUNT_CREATE,
  ACCOUNT_CREATE_ROLLBACK,
  ACCOUNT_CREATE_SUCCESS,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_ROLLBACK,
  ACCOUNT_UPDATE_SUCCESS,
} from '../types';

import {DEV_URL} from '../../config';

export const getAccounts = () => {
  return (dispatch) => {
    return Account.get()
      .then((accounts) => {
        dispatch({
          type: ACCOUNT_FETCH_SUCCESS,
          payload: accounts,
        });
      })
      .catch((e) => {
        dispatch({
          type: ACCOUNT_FETCH_ROLLBACK,
          payload: e,
        });
      });
  };
};

export const selectAccountType = (value) => {
  return {
    type: 'CHANGE_ACCOUNT_TYPE',
    payload: value,
  };
};

export const addAccount = ({name, type, openingBalance, icon, callback}) => {
  let accountId = uuidv4();
  const accountData = {
    id: accountId,
    name: name,
    openingBalance: parseFloat(openingBalance),
    type: type,
    icon: icon,
    balance: 0,
  };
  return (dispatch) => {
    dispatch({
      type: ACCOUNT_CREATE,
      payload: accountData,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/accounts`,
            method: 'POST',
            data: accountData,
          },
          commit: {type: ACCOUNT_CREATE_SUCCESS, meta: {accountId}},
          rollback: {type: ACCOUNT_CREATE_ROLLBACK, meta: {accountId}},
        },
      },
    });
    callback();
  };
};

export const editAccount = ({
  id,
  name,
  openingBalance,
  balance,
  type,
  icon,
  callback,
}) => {
  var accountData = {
    id: id,
    icon: icon,
    openingBalance: parseFloat(openingBalance),
    name: name,
    type: type,
  };

  if (name === '') {
    return (dispatch) => {
      dispatch({
        type: ACCOUNT_UPDATE_ROLLBACK,
        payload: 'Account title is required!',
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: ACCOUNT_UPDATE,
      payload: accountData,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/accounts/${id}`,
            method: 'PUT',
            data: accountData,
          },
          commit: {type: ACCOUNT_UPDATE_SUCCESS, meta: {id}},
          rollback: {type: ACCOUNT_UPDATE_ROLLBACK, meta: {id}},
        },
      },
    });
    callback();
  };
};

export const deleteAccount = ({id, callback}) => {
  return (dispatch) => {
    dispatch({
      type: ACCOUNT_DELETE,
      payload: id,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/accounts/${id}`,
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
