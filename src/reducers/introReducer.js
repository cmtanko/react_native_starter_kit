const initialState = {
  show: true,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'intro_insert_success': {
      return {...state, show: action.payload};
    }
    default:
      return state;
  }
}
