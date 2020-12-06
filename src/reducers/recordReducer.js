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
} from '../actions/types';

const initialState = {
  list: [],
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'LOADING_RECORD': {
      return {...state, loading: true};
    }
    case 'RECORD_INPUT_CHANGE':
      return {
        ...state,
        [action.payload.field]: action.payload.value,
        error: '',
      };
    case RECORD_FETCH_SUCCESS:
      return {...state, list: action.payload, error: '', loading: false};
    case RECORD_CREATE:
      return {
        ...state,
        list: [...state.list, action.payload],
        loading: false,
        error: null,
      };
    case RECORD_UPDATE:
      return {
        ...state,
        list: state.list.map((record) => {
          return record.id === action.payload.id ? action.payload : record;
        }),
        loading: false,
        error: null,
      };
    case RECORD_DELETE:
      return {
        ...state,
        list: state.list.filter((record) => record.id !== action.payload),
        loading: false,
        error: null,
      };
    case RECORD_CREATE_SUCCESS:
    case RECORD_UPDATE_SUCCESS:
      return {...state, error: '', loading: false};
    case RECORD_CREATE_ROLLBACK:
    case RECORD_FETCH_ROLLBACK:
    case RECORD_UPDATE_ROLLBACK:
      return {...state, error: action.payload};
    default:
      return state;
  }
}
