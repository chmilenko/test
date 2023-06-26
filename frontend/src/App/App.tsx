import React from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "../Components/layout/Layout";
import Main from "../Components/main/Main";
import Registration from "../Components/auth/Registration";
import Authenication from "../Components/auth/Authenication";

function App() {
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
