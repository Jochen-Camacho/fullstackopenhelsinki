import { createSlice } from "@reduxjs/toolkit";

const initialState = null;

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    createMessage(state, action) {
      return action.payload;
    },
  },
});

export const { createMessage } = notificationSlice.actions;
export default notificationSlice.reducer;

export const setNotification = (content, time) => {
  return async (dispatch) => {
    dispatch(createMessage(content));
    setTimeout(() => {
      dispatch(createMessage(null));
    }, time * 1000);
  };
};
