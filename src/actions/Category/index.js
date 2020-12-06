// import 'react-native-get-random-values';
import {v4 as uuidv4} from 'uuid';
import Category from '../../services/Category';

import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_FETCH_ROLLBACK,
  CATEGORY_CREATE,
  CATEGORY_CREATE_ROLLBACK,
  CATEGORY_CREATE_SUCCESS,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_ROLLBACK,
  CATEGORY_UPDATE_SUCCESS,
} from '../types';

import {DEV_URL} from '../../config';

export const getCategories = () => {
  return (dispatch) => {
    return Category.get()
      .then((categories) => {
        dispatch({
          type: CATEGORY_FETCH_SUCCESS,
          payload: categories,
        });
      })
      .catch((e) => {
        dispatch({
          type: CATEGORY_FETCH_ROLLBACK,
          payload: e,
        });
      });
  };
};

export const selectCategoryType = (value) => {
  return {
    type: 'CHANGE_CATEGORY_TYPE',
    payload: value,
  };
};

export const addCategory = ({name, type, icon, callback}) => {
  let categoryId = uuidv4();
  const categoryData = {
    id: categoryId,
    name: name,
    type: type,
    icon: icon,
  };
  return (dispatch) => {
    dispatch({
      type: CATEGORY_CREATE,
      payload: categoryData,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/categories`,
            method: 'POST',
            data: categoryData,
          },
          commit: {type: CATEGORY_CREATE_SUCCESS, meta: {categoryId}},
          rollback: {type: CATEGORY_CREATE_ROLLBACK, meta: {categoryId}},
        },
      },
    });
    callback();
  };
};

export const editCategory = ({name, type, icon, id, callback}) => {
  var categoryData = {
    id: id,
    icon: icon,
    name: name,
    type: type,
  };

  if (name === '') {
    return (dispatch) => {
      dispatch({
        type: CATEGORY_UPDATE_ROLLBACK,
        payload: 'Category title is required!',
      });
    };
  }
  return (dispatch) => {
    dispatch({
      type: CATEGORY_UPDATE,
      payload: categoryData,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/categories/${id}`,
            method: 'PUT',
            data: categoryData,
          },
          commit: {type: CATEGORY_UPDATE_SUCCESS, meta: {id}},
          rollback: {type: CATEGORY_UPDATE_ROLLBACK, meta: {id}},
        },
      },
    });
    callback();
  };
};

export const deleteCategory = ({id, callback}) => {
  return (dispatch) => {
    dispatch({
      type: CATEGORY_DELETE,
      payload: id,
      meta: {
        offline: {
          effect: {
            url: `${DEV_URL}/categories/${id}`,
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
