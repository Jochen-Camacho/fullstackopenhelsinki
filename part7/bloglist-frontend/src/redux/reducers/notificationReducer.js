import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: null,
  },
  reducers: {
    setNotification(state, action) {
      return { message: action.payload.message, type: action.payload.type };
    },
    removeNotification() {
      return {
        message: null,
        type: null,
      };
    },
  },
});

export const { setNotification, removeNotification } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const timeoutNotification = () => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(removeNotification());
    }, 5000);
  };
};
