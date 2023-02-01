import { createSlice } from "@reduxjs/toolkit";

const initialState: { token: string; uuid: string[] } = {
  token: "",
  uuid: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log("login", action);
      state.token = action.payload.token;
    },

    getFriends(state, action) {
      console.log("getFriends", action);
      state.uuid = action.payload.uuid;
    },

    resetInfo(state, action) {
      console.log("reset", action);
      state.token = initialState.token;
      state.uuid = initialState.uuid;
    },
  },
  extraReducers: {},
});

export default userSlice;
