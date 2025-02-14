import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as endpoints from "../../Utility/NetworkUtility";
import { setLoading } from "./loaderSlice";
import { toast } from "react-toastify";

const initialState = {
    role: localStorage.getItem("role") || "",  // Get role from localStorage
    token: localStorage.getItem("token") || "", // Get token from localStorage
  };
  

const AuthSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      return {
        ...state,
        role: action.payload.role,
        token: action.payload.token, // Save token in state
      };
    },
    logout: (state) => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        state.token = "";
        state.role = "";
    },
  },
});

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      dispatch(setLoading({
        isLoading:true
      }))
      const response = await fetch(endpoints.login, {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.status === 200) {
        toast.success("Login Successful.")
        const data = await response.json();
        console.log(data.role)
        dispatch(setLogin({
          role: data.role,
          token: data.token, // Store token
        }));
        localStorage.setItem("token", data.token); // Store token in localStorage
        localStorage.setItem("role", data.role); // Store token in localStorage
      } else {
        return rejectWithValue("Login failed");
      }
      dispatch(setLoading({
        isLoading:false
      }))
    } catch (error) {
      console.log(error);
      return rejectWithValue("An error occurred");
    } 
  }
);

export const { setLogin, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
