import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const loaderSlice = createSlice({
  name: "loaderSlice",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };
    },
  },
});

export const { setLoading } = loaderSlice.actions;
export default loaderSlice.reducer;
