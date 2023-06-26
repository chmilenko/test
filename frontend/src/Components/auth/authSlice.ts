import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import State from "./types/State";
import * as api from "./api";
import LoginData from "./types/loginData";
import RegisterData from "./types/registerData";

const initialState: State = {
  authChecked: false,
  user: undefined,
  loginFormError: undefined,
  registerFormError: undefined,
};

export const getUser = createAsyncThunk("auth/user", () => api.user());

export const login = createAsyncThunk(
  "auth/registration",
  (data: LoginData) => {
    if (!data.email.trim() || !data.password.trim()) {
      throw new Error("Не все поля заполнены");
    }
    return api.login(data);
  }
);

export const register = createAsyncThunk(
  "auth/authenication",
  async (data: RegisterData) => {
    if (data.password !== data.passwordRepeat) {
      throw new Error("Пароли не совпадают");
    }
    if (
      !data.login.trim() ||
      !data.email.trim() ||
      !data.password.trim() ||
      !data.passwordRepeat.trim()
    ) {
      throw new Error("Не все поля заполнены");
    }
    return api.register(data);
  }
);

export const logout = createAsyncThunk("auth/logout", api.logout);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetLoginErrorForm: (state) => {
      state.loginFormError = undefined;
    },
    resetRegisterErrorForm: (state) => {
      state.registerFormError = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.authChecked = true;
        state.user = action.payload.isLoggedIn
          ? action.payload.user
          : undefined;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loginFormError = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.loginFormError = action.error.message;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.registerFormError = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.registerFormError = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = undefined;
      });
  },
});

export const { resetLoginErrorForm, resetRegisterErrorForm } =
  authSlice.actions;

export default authSlice.reducer;
