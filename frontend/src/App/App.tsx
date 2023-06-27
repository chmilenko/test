import React, { useEffect, useLayoutEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import Registration from "../Features/auth/Registration";
import Authenication from "../Features/auth/Authenication";
import { getUser } from "../Features/auth/authSlice";
import { RootState, useAppDispatch } from "../store";
import { selectAuthChecked } from "../Features/auth/selectors";
import { useSelector } from "react-redux";
import ProductView from "../Features/Products/ProductView";
import { loadProductList } from "../Features/Products/productSlice";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useSelector(selectAuthChecked);


  useEffect(() => {
    dispatch(getUser());
    dispatch(loadProductList());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div>
        <span>Loading ...</span>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProductView />} path="/" />
        <Route element={<Registration />} path="/registration" />
        <Route element={<Authenication />} path="/authenication" />
      </Route>
    </Routes>
  );
}

export default App;
