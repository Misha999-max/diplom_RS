import { createAction, createSlice } from "@reduxjs/toolkit";
// import httpService from "../services/http.service";
import { isDate } from "../utils/date";
import productService from "../services/product.service";

const productSlice = createSlice({
  name: "products",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
    lastFetch: null,
  },
  reducers: {
    productsRequeted: (state) => {
      state.isLoading = true;
    },
    productsReceved: (state, action) => {
      state.entities = action.payload;
      state.lastFetch = Date.now();
      state.isLoading = false;
    },
    productsRequestFild: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    productCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    productRemoved: (state, action) => {
      state.entities = state.entities.filter((c) => c._id !== action.payload);
    },
  },
});

const { reducer: productReducer, actions } = productSlice;
const {
  productsRequeted,
  productsReceved,
  productsRequestFild,
  productCreated,
  productRemoved,
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");

export const loadProductsList = () => async (dispatch, getState) => {
  const { lastFetch } = getState().product;
  if (isDate(lastFetch)) {
    dispatch(productsRequeted);
    try {
      const { list } = await productService.fetchAll();
      dispatch(productsReceved(list));
    } catch (error) {
      dispatch(productsRequestFild(error.message));
    }
  }
};
export const createProduct = (payload) => async (dispatch, getState) => {
  dispatch(addProductRequested());
  try {
    const { list } = await productService.createProduct(payload);
    console.log(list);
    dispatch(productCreated(list));
  } catch (error) {
    dispatch(productsRequestFild(error.message));
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(removeProductRequested());
  try {
    const { list } = await productService.removeProduct(productId);
    if (list) {
      dispatch(productRemoved(productId));
    }
  } catch (error) {
    dispatch(productsRequestFild(error.message));
  }
};

export const getProducts = () => (state) => state.product.entities;
export const getProductsStatus = () => (state) => state.product.isLoading;

export default productReducer;
