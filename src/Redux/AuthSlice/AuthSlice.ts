import { createSlice } from "@reduxjs/toolkit";

const storedData = localStorage.getItem("userData");

const initialState = {
  data: storedData ? JSON.parse(storedData).aboutUser : null,
  headers: {
    headers: {
      authorization: storedData ?`Hamada__${JSON.parse(storedData).accessToken}`  : null,
    },
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      const storedData = localStorage.getItem("userData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);

        if (parsedData.aboutUser && parsedData.accessToken) {
          state.data = parsedData.aboutUser;
          state.headers = {
            headers: {
              authorization: `Hamada__${parsedData.accessToken}`,
            },
          };
        } else {
          state.data = null;
          state.headers.headers = { authorization: null };
        }
      } else {
        state.data = null;
        state.headers.headers = { authorization: null };
      }
    },
    logOut: (state) => {
      localStorage.removeItem("userData");
      state.data = null;
      state.headers.headers = { authorization: null };
    },
  },
});

export const { login, logOut } = authSlice.actions;
export default authSlice.reducer;
