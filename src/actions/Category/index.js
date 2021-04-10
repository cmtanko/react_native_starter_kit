// import 'react-native-get-random-values';
import {fetchCategory, updateCategory, removeCategory} from '../../helpers/db';

import {
  CATEGORY_FETCH_SUCCESS,
  CATEGORY_CREATE,
  CATEGORY_DELETE,
  CATEGORY_UPDATE,
  CATEGORY_UPDATE_ROLLBACK,
} from '../types';

import {insertCategory} from '../../helpers/db';

export const getCategories = () => {
  return async (dispatch) => {
    try {
      const dbResult = await fetchCategory();
      dispatch({
        type: CATEGORY_FETCH_SUCCESS,
        payload: dbResult,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const selectCategoryType = (value) => {
  return {
    type: 'CHANGE_CATEGORY_TYPE',
    payload: value,
  };
};

export const addCategory = ({title, type, icon, callback}) => {
  return async (dispatch) => {
    try {
      const dbResult = await insertCategory(title, type, icon);
      const categoryData = {
        id: dbResult.insertId.toString(),
        title: title,
        type: type,
        icon: icon,
      };
      dispatch({type: CATEGORY_CREATE, payload: categoryData});
      callback();
    } catch (error) {
      throw error;
    }
  };
};

export const editCategory = ({title, type, icon, id, callback}) => {
  return async (dispatch) => {
    try {
      let categoryData = {
        id: id,
        icon: icon,
        title: title,
        type: type,
      };

      if (title === '') {
        dispatch({
          type: CATEGORY_UPDATE_ROLLBACK,
          payload: 'Category title is required!',
        });
      } else {
        await updateCategory(id, title, type, icon, callback);

        dispatch({
          type: CATEGORY_UPDATE,
          payload: categoryData,
        });
        callback();
      }
    } catch (error) {
      throw error;
    }
  };
};

export const deleteCategory = ({id, callback}) => {
  return async (dispatch) => {
    try {
      await removeCategory(id);

      dispatch({
        type: CATEGORY_DELETE,
        payload: id,
      });
      callback();
    } catch (error) {
      throw error;
    }
  };
};
