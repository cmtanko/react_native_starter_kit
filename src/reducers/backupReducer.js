const initialState = {
  list: [],
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'backup_fetch_success': {
      return {...state, list: action.payload, loading: false};
    }
    case 'backup_created_success': {
      return {...state, list: [...state.list, action.payload], loading: false};
    }
    case 'database_reset_success': {
      return {...state};
    }
    default:
      return state;
  }
}
