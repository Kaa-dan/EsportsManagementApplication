import { Route, Routes } from "react-router-dom";
import HomePage from "../../presentation/screens/user/home/Home";
import UserRoute from "./userRoute";
import AuthRoute from "./authRoute";
import AdminRoute from "./adminRoute";
const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/user/*" element={<UserRoute />} />
      <Route path="/auth/*" element={<AuthRoute />} />
      <Route path="/admin/*" element={<AdminRoute />} />
    </Routes>
  );
};

export default MainRoutes;
