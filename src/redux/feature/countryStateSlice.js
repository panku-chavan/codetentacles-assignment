import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as endpoints from "../../Utility/NetworkUtility";

const initialState = {
  countries: [],
  states: [],
};

export const getCountries = createAsyncThunk(
  "get countries",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const response = await fetch(endpoints.get_countries, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        dispatch(
          setCountries({
            data: data.data,
          })
        );
      }
    } catch (error) {
      console.log(error);

      rejectWithValue("an error occured");
    }
  }
);

export const getStates = createAsyncThunk(
  "get states",
  async (obj, { dispatch, rejectWithValue }) => {
    try {
      const queryParams = new URLSearchParams(obj).toString();
      const url = `${endpoints.get_state}?${queryParams}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        // console.log(data);
        dispatch(
          setStates({
            data: data.data,
          })
        );
      }
    } catch (error) {
      console.log(error);

      rejectWithValue("an error occured");
    }
  }
);

const countryStateSlice = createSlice({
  name: "country stete slice ",
  initialState,
  reducers: {
    setCountries: (state, action) => {
      return {
        ...state,
        countries: action.payload.data,
      };
    },
    setStates: (state, action) => {
      return {
        ...state,
        states: action.payload.data,
      };
    },
  },
});

export const { setCountries, setStates } = countryStateSlice.actions;
export default countryStateSlice.reducer;
