import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    monuments:[]
};

const monumentsSlice = createSlice({
  name: "monuments",
  initialState,
  reducers: {
    setmonuments: (state,action) => {
      state.monuments=action.payload;
    },
  },
});

export const { setmonuments } = monumentsSlice.actions;
export default monumentsSlice.reducer;
