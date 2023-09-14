import { Routes, Route } from "react-router-dom";
import HomePage from "../../presentation/screens/user/home/Home";
const userRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export default userRoute;
