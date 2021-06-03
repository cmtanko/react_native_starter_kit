export const setIntroState = (value) => {
  return (dispatch) => {
    try {
      dispatch({
        type: 'intro_insert_success',
        payload: value,
      });
    } catch (error) {
      throw error;
    }
  };
};
