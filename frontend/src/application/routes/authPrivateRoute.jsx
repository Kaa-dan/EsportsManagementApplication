import React from "react";
import { Outlet } from "react-router-dom";
import Login from "../../presentation/screens/user/auth/Login";
import { useSelector } from "react-redux";

const authPrivateRoute = () => {
  // const { userInfo } = useSelector((state) => state.auth);
  const userInfo = true;
  return userInfo ? <Outlet /> : <Login />;
};

export default authPrivateRoute;
