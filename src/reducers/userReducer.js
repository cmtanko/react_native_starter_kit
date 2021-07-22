const initialState = {
  list: [],
  error: '',
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'user_fetch_success': {
      return {...state, list: action.payload, loading: false};
    }
    case 'user_insert_success': {
      return {...state};
    }
    default:
      return state;
  }
}
