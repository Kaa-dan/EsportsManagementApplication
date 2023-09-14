import AdminDashboard from "../../presentation/screens/admin/AdminDashboard";
import Users from "../../presentation/screens/admin/Users";
import { Route, Routes } from "react-router-dom";

const adminRoute = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminDashboard />} />
      <Route path="/Users" element={<Users />} />
    </Routes>
  );
};

export default adminRoute;
