const initialState = {
  preference: {
    id: 1,
    currency: 'AUD',
    lockscreen: 'false',
    notification: 'false',
  },
  error: '',
  loading: false,
  locked: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'setting_fetch_success': {
      return {...state, preference: action.payload};
    }
    case 'setting_add_success': {
      return {...state, preference: action.payload};
    }
    case 'lock_insert_success': {
      return {...state, locked: action.payload};
    }
    default:
      return state;
  }
}
