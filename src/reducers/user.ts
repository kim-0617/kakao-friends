import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login(state, action) {
      console.log("login", state, action);
      state.token = action.payload.token;
    },
  },
  extraReducers: {},
});

export default userSlice;
