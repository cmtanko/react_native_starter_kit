const initialState = 'WEEKLY';

export default function (state = initialState, action) {
  switch (action.type) {
    case 'report_update':
      return action.payload;
    default:
      return state;
  }
}
