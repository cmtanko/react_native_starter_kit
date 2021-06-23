const initialState = {
  account: null,
  category: null,
  date: null,
  predictedAccountId: null,
  predictedCategoryId: null,
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
    case 'SELECT_DATE':
      return {
        ...state,
        date: action.payload ? action.payload : null,
      };
    case 'PREDICTED_CATEGORY_ID':
      return {
        ...state,
        predictedCategoryId: action.payload ? action.payload : null,
      };
    case 'PREDICTED_ACCOUNT_ID':
      return {
        ...state,
        predictedAccountId: action.payload ? action.payload : null,
      };
    default:
      return state;
  }
}
