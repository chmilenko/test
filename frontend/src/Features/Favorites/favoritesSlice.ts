import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import State from "./types/State";
import * as api from "./api";
import { FavoriteId } from "./types/favoritesType";
import Product from "../Products/types/productType";

const initialState: State = {
  loading: false,
  error: undefined,
  favoritesArr: [],
};

export const loadSavedProducts = createAsyncThunk("products/loadSaved", () =>
  api.initSavedProductList()
);

export const addNewSavedProduct = createAsyncThunk(
  "product/loadNewSavedProduct",
  (newSavedProduct: Product) => api.addNewSavedProduct(newSavedProduct)
);

export const delSavedProduct = createAsyncThunk(
  "product/delSavedProduct",
  (id: FavoriteId) => {
    return api.deleteSavedProduct(id);
  }
);

const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    resetError: (state) => {
      state.loading = true;
      state.error = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadSavedProducts.fulfilled, (state, action) => {
        state.favoritesArr = action.payload;
      })
      .addCase(loadSavedProducts.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addNewSavedProduct.fulfilled, (state, action) => {
        state.favoritesArr.push(action.payload);
      })
      .addCase(addNewSavedProduct.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(delSavedProduct.fulfilled, (state, action) => {
        state.favoritesArr = state.favoritesArr.filter(
          (favorite) => favorite.id !== Number(action.payload)
        );
      })
      .addCase(delSavedProduct.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

export default favoriteSlice.reducer;
