import { Button } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../../application/slice/user/authSlice";
import { useLogoutMutation } from "../../../../application/slice/user/authApiSlice";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);
  const logOutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <h1 style={{ color: "red" }}>{userInfo ? userInfo.name : "NO USER"}</h1>
      <h1 style={{ color: "red" }}>{userInfo ? userInfo.email : "NO USER"}</h1>
      {userInfo ? <Button onClick={logOutHandler}>logout</Button> : ""}
    </div>
  );
};

export default Home;
