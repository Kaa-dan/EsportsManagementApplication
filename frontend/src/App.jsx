import { ColorModeCotext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./presentation/screens/user/auth/Login";
import Register from "./presentation/screens/user/auth/Register";
import ForgotPassword from "./presentation/screens/user/auth/ForgotPassword";
import HomePage from "./presentation/screens/user/home/Home";

export default function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeCotext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ForgotPassword />} />
            <Route path="/" element={<HomePage />} />
            {/* Define other routes here */}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeCotext.Provider>
  );
}
