import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/Layout/Layout";
import Registration from "../Features/Auth/Registration";
import Authenication from "../Features/Auth/Authenication";
import { getUser } from "../Features/Auth/authSlice";
import { useAppDispatch } from "../store";
import { selectAuthChecked } from "../Features/Auth/selectors";
import { useSelector } from "react-redux";
import ProductView from "../Features/Products/ProductView";
import { loadProductList } from "../Features/Products/productSlice";
import FavoriteView from "../Features/Favorites/FavoriteView";
import { loadSavedProducts } from "../Features/Favorites/favoritesSlice";
import "./App.sass";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useSelector(selectAuthChecked);
  
  useEffect(() => {
    dispatch(getUser());
    dispatch(loadProductList());
    dispatch(loadSavedProducts());
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div>
        <span>Загрузка ...</span>
      </div>
    );
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProductView />} path="/" />
        <Route element={<Registration />} path="/registration" />
        <Route element={<Authenication />} path="/authenication" />
        <Route element={<FavoriteView />} path="/favorites"></Route>
      </Route>
    </Routes>
  );
}

export default App;
