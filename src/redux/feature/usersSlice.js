import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as endpoints from "../../Utility/NetworkUtility";
import { logout } from "./AuthSlice";
import { setLoading } from "./loaderSlice";
import { toast } from "react-toastify";

const initialState = {
  usersList: [],
  total: 0,
  currentPage: 1,
  perPage: 10,
  lastPage: 1,
  success:false
};

export const getUserList = createAsyncThunk(
  "getusersList",
  async ({ page, perPage }, { dispatch, rejectWithValue }) => {
    try {
      const url = new URL(endpoints.user_list);
      url.searchParams.append("page", page);
      url.searchParams.append("per_page", perPage);
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        if (
          data.status === "Token is Expired" ||
          data.status === "Token is Invalid"
        ) {
          toast.error("Token i expired!, Login again.")

          dispatch(logout());
        }
        dispatch(
          setUserList({
            data: data.data,
            total: data.total,
            currentPage: data.currentPage,
            perPage: data.perPage,
            lastPage: data.lastPage,
          })
        );
      } else {
        //handle 403 error or any
        dispatch(logout());
      }
    } catch (error) {
      console.log(error);
      rejectWithValue("an error occured");
    }
  }
);

export const addUser = createAsyncThunk(
  "addUser",
  async (FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        setLoading({
          isLoading: true,
        })
      );
      const response = await fetch(endpoints.register_user, {
        method: "POST",
        body: FormData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        dispatch(setUserState());
        dispatch(getUserList(1,10))
        toast.success("User added to list.");
      } else if(response.status===422){

        data.message.map((msg)=>toast.error(msg))
        // toast.error("Error while adding product, try again.");

      }else{
        toast.error("Error while adding product, try again.");

      }
      dispatch(
        setLoading({
          isLoading: false,
        })
      );
    } catch (error) {
      console.log(error);
      rejectWithValue("an error occured");
    }
  }
);

export const deleteUser = createAsyncThunk(
  "deleteUser",
  async ({id, page, perPage }, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        setLoading({
          isLoading: true,
        })
      );
      const response = await fetch(`${endpoints.delete_user}${id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        console.log(data);
        dispatch(getUserList({ page, perPage }));
        toast.success("Deleted Successful.")
      }else{
        toast.error("error while deleting, try again.")

      }
      dispatch(
        setLoading({
          isLoading: false,
        })
      );
    } catch (error) {
      console.log(error);
      rejectWithValue("an error occured");
    }
  }
);

const usersSlice = createSlice({
  name: "usesSlice",
  initialState,
  reducers: {
    setUserList: (state, action) => {
      state.usersList = action.payload.data;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.perPage = action.payload.perPage;
      state.lastPage = action.payload.lastPage;
    },
    setUserState:(state)=>{
      state.success=true;
    },
    resetUserState:(state)=>{
      state.success=false;
    }
  },

});

export const { setUserList ,setUserState,resetUserState} = usersSlice.actions;
export default usersSlice.reducer;
