const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_ACCOUNT_TYPE':
      return action.payload;
    default:
      return state;
  }
}
