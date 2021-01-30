const initialState = 'INCOME';

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_CATEGORY_TYPE':
      return action.payload;
    default:
      return state;
  }
}
