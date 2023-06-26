import React, { useEffect } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import Main from "../Components/main/Main";
import Registration from "../Components/auth/Registration";
import Authenication from "../Components/auth/Authenication";
import { getUser } from "../Components/auth/authSlice";
import { useAppDispatch } from "../store";
import { selectAuthChecked } from "../Components/auth/selectors";
import { useSelector } from "react-redux";

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authChecked = useSelector(selectAuthChecked);

  useEffect(() => {
    dispatch(getUser());
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
        <Route element={<Main />} path="/" />
        <Route element={<Registration />} path="/registration" />
        <Route element={<Authenication />} path="/authenication" />
      </Route>
    </Routes>
  );
}

export default App;

