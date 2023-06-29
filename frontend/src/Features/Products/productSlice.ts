import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { State } from "./types/StateProducts";
import * as api from "./api";
import Product, { ProductId } from "./types/productType";

const initialState: State = {
  products: [],
  error: undefined,
};

export const loadProductList = createAsyncThunk(
  "product/loadProducts",
  async () => {
    return api.initProductsList();
  }
);

export const addNewProduct = createAsyncThunk(
  "product/addNewProduct",
  (newProduct: Product) => api.addNewProduct(newProduct)
);

export const delProduct = createAsyncThunk(
  "product/delete",
  (id: ProductId) => {
    return api.deleteProduct(id);
  }
);

const productSlice = createSlice({
  name: "products;",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadProductList.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(loadProductList.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(addNewProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(delProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== Number(action.payload)
        );
      })
      .addCase(delProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
