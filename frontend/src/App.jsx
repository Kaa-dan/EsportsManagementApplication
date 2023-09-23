import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./application/routes/routes";

export default function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}
