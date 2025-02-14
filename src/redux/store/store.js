import { configureStore } from '@reduxjs/toolkit';
import authSlice from "../feature/AuthSlice";
import usersSlice from "../feature/usersSlice";
import productSlice from "../feature/productSlice";
import countryStateSlice from "../feature/countryStateSlice";
import loaderSlice from "../feature/loaderSlice";

export const store = configureStore({
  reducer: {
    auth:authSlice,
    usersSlice:usersSlice,
    productSlice:productSlice,
    countryStateSlice:countryStateSlice,
    loader:loaderSlice
  },
})