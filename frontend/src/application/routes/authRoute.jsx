import React from "react";
import AuthPrivateRoute from "./authPrivateRoute";
import Login from "../../presentation/screens/user/auth/Login";
import Register from "../../presentation/screens/user/auth/Register";
import ForgotPassword from "../../presentation/screens/user/auth/ForgotPassword";
import RegisterOtp from "../../presentation/screens/user/auth/RegisterOtp";
import ForgotPasswordOtp from "../../presentation/screens/user/auth/ForgotPasswordOtp";
import ResetPassword from "../../presentation/screens/user/auth/ResetPassword";
import { Route, Routes } from "react-router-dom";
const authRoute = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<AuthPrivateRoute />}>
        <Route path="/register-otp" element={<RegisterOtp />} />
        <Route path="/forgot-password-otp" element={<ForgotPasswordOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/*" element={<Login />} />
    </Routes>
  );
};

export default authRoute;
