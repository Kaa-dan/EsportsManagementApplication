// import { CssBaseline, ThemeProvider } from "@mui/material";
// import { BrowserRouter } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Routes from "./application/routes/routes";
// import { createTheme } from "@mui/system";

// export default function App() {

//   return (
//     <>

//         <CssBaseline />
//         <BrowserRouter>
//           <Routes />
//         </BrowserRouter>
//         <ToastContainer />

//     </>
//   );
// }
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Routes from "./application/routes/routes";
import { createTheme } from "@mui/system";

const darkTheme = createTheme({
  palette: {
    mode: "dark", // Set the theme mode to dark
    // You can customize other theme options here, like primary and secondary colors
    // For example:
    // primary: {
    //   main: '#FFA726',
    // },
    // secondary: {
    //   main: '#FFD95B',
    // },
  },
  typography: {
    fontWeightBold: 700, // Set your preferred value for fontWeightBold
    // Other typography settings
  },
});

export default function App() {
  return (
    // <ThemeProvider theme={darkTheme}>
    <>
      <CssBaseline />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <ToastContainer />
    </>

    // </ThemeProvider>
  );
}
