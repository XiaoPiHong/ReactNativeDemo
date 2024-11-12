import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: "xiaopihong",
  token: "xxx",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      const {username, token} = action.payload;
      state.username = username;
      state.token = token;
    },
    updateToken(state, action) {
      state.token = action.payload.token;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {updateUser, updateToken, clearUser} = userSlice.actions;

export default userSlice.reducer;
