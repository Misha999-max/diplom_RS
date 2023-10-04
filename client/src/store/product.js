import { createAction, createSlice } from "@reduxjs/toolkit";
// import httpService from "../services/http.service";
import { isDate } from "../utils/date";
import productService from "../services/product.service";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

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
    productUpdateSuccessed: (state, action) => {
      state.entities[
        state.entities.findIndex((u) => u._id === action.payload._id)
      ] = action.payload;
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
  productUpdateSuccessed,
} = actions;

const addProductRequested = createAction("products/addProductRequested");
const removeProductRequested = createAction("products/removeProductRequested");
const productUpdateRequested = createAction("products/productUpdateRequested");

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
    dispatch(productCreated(list));
    history.push("/");
  } catch (error) {
    dispatch(productsRequestFild(error.message));
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  dispatch(removeProductRequested(productId));
  try {
    const { content } = await productService.removeProduct(productId);

    if (content === undefined) {
      dispatch(productRemoved(productId));
    }
  } catch (error) {
    dispatch(productsRequestFild(error.message));
  }
};

export const updateProduct = (payload) => async (dispatch) => {
  dispatch(productUpdateRequested());
  try {
    const { content } = await productService.update(payload);
    console.log(content);
    dispatch(productUpdateSuccessed(content));
  } catch (error) {
    dispatch(productUpdateRequested(error.message));
  }
};

export const getProducts = () => (state) => state.product.entities;
export const getProductsStatus = () => (state) => state.product.isLoading;

export default productReducer;
