import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  username: "",
  accessToken: "",
  refreshToken: "",
  tokenType: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateUser(state, action) {
      state.username = action.payload.username;
    },
    updateTokenConfig(state, action) {
      const {access_token, refresh_token, token_type} = action.payload;
      state.accessToken = access_token;
      state.refreshToken = refresh_token;
      state.tokenType = token_type;
    },
    clearUser() {
      return initialState;
    },
  },
});

export const {updateTokenConfig, clearUser} = userSlice.actions;

export default userSlice.reducer;
