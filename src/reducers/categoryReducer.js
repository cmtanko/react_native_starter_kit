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
} from '../actions/types';

const initialState = {
  list: [],
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOADING_CATEGORY': {
      return {...state, loading: true};
    }
    case 'CATEGORY_INPUT_CHANGE':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        error: '',
      };
    case CATEGORY_FETCH_SUCCESS:
      return {...state, list: action.payload, error: '', loading: false};
    case CATEGORY_CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        error: null,
      };
    case CATEGORY_UPDATE:
      return {
        ...state,
        list: state.list.map((category) => {
          return category.id === action.payload.id ? action.payload : category;
        }),
        loading: false,
        error: null,
      };
    case CATEGORY_DELETE:
      return {
        ...state,
        list: state.list.filter((category) => category.id !== action.payload),
        loading: false,
        error: null,
      };
    case CATEGORY_CREATE_SUCCESS:
    case CATEGORY_UPDATE_SUCCESS:
      return {...state, error: '', loading: false};
    case CATEGORY_CREATE_ROLLBACK:
    case CATEGORY_FETCH_ROLLBACK:
    case CATEGORY_UPDATE_ROLLBACK:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
