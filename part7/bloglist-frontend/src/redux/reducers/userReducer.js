import { createSlice } from '@reduxjs/toolkit';
import blogService from '../../services/blogs';
import loginService from '../../services/login';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      blogService.setToken(action.payload.token);
      return action.payload;
    },
    removeUser() {
      blogService.setToken('');
      return null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({ username, password });
    dispatch(setUser(user));
    return user;
  };
};
