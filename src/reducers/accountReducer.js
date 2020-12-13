import {
  ACCOUNT_FETCH_SUCCESS,
  ACCOUNT_FETCH_ROLLBACK,
  ACCOUNT_CREATE,
  ACCOUNT_DELETE,
  ACCOUNT_UPDATE,
  ACCOUNT_UPDATE_ROLLBACK,
  ACCOUNT_UPDATE_SUCCESS,
} from '../actions/types';

const initialState = {
  list: [],
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOADING_ACCOUNT': {
      return {...state, loading: true};
    }
    case ACCOUNT_FETCH_SUCCESS:
      return {...state, list: action.payload, error: '', loading: false};
    case ACCOUNT_CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        error: null,
      };
    case ACCOUNT_UPDATE:
      return {
        ...state,
        list: state.list.map((account) => {
          return account.id === action.payload.id ? action.payload : account;
        }),
        loading: false,
        error: null,
      };
    case ACCOUNT_DELETE:
      return {
        ...state,
        list: state.list.filter((account) => account.id !== action.payload),
        loading: false,
        error: null,
      };
    case ACCOUNT_UPDATE_SUCCESS:
      return {...state, error: '', loading: false};
    case ACCOUNT_FETCH_ROLLBACK:
    case ACCOUNT_UPDATE_ROLLBACK:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
