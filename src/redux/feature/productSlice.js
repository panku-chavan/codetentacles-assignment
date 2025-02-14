import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as endpoints from "../../Utility/NetworkUtility";
import { setLoading } from "./loaderSlice";
import { logout } from "./AuthSlice";
import { toast } from "react-toastify";

const initialState = {
  productList: [],
  isSuccess: false,
  total: 0,
  currentPage: 1,
  perPage: 10,
  lastPage: 1,
};

export const getProducstList = createAsyncThunk(
  "get products list",
  async ({ page, perPage }, { dispatch, rejectWithValue }) => {
    try {
      const url = new URL(endpoints.product_list);
      url.searchParams.append('page', page);
      url.searchParams.append('per_page', perPage);
      
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        if(data.status==="Token is Invalid"||data.status==="Token is Expired"){
          // alert("Token is expired, please login again.");
          console.log("Token is expired, please login again.")
          toast.error("Token i expired!, Login again.")
          dispatch(logout());
        }
        dispatch(setProducts({
          data: data.data,
          total: data.total,
          currentPage: data.currentPage,
          perPage: data.perPage,
          lastPage: data.lastPage,
        }));
      }else{
        //handle 403 error or any
        dispatch(logout());
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const addProduct = createAsyncThunk(
  "add product",
  async (FormData, { dispatch, rejectWithValue }) => {
    try {
      dispatch(
        setLoading({
          isLoading: true,
        })
      );
      const response = await fetch(endpoints.add_product, {
        method: "POST",
        body: FormData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (response.status === 200) {
        console.log(data);
        if (data.success === true) {
          dispatch(setProductState());
          toast.success("Product added to list.");
        }
      }else if(response.status===422){
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
      rejectWithValue("An error occured.");
    }
  }
);
const productSlice = createSlice({
  name: "proctSlice",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.productList = action.payload.data;
      state.total = action.payload.total;
      state.currentPage = action.payload.currentPage;
      state.perPage = action.payload.perPage;
      state.lastPage = action.payload.lastPage;
    },
    setProductState: (state) => {
      return {
        ...state,
        isSuccess: true,
      };
    },
    reseteProductState: (state) => {
      return {
        ...state,
        isSuccess: false,
      };
    },
  },
});

export const { setProducts, setProductState, reseteProductState } =
  productSlice.actions;
export default productSlice.reducer;
