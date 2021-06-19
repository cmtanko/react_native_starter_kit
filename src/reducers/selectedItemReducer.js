const initialState = {
  account: null,
  category: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SELECT_ACCOUNT':
      return {
        ...state,
        account: state.account !== action.payload ? action.payload : null,
      };
    case 'SELECT_CATEGORY':
      return {
        ...state,
        category: state.category !== action.payload ? action.payload : null,
      };
    default:
      return state;
  }
}
