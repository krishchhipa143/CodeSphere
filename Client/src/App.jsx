import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import WelcomePage from "./Pages/WelcomPage";
import SignUp from "./Components/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./Pages/HomePage";
import PrivateRoute from "../PrivateRoute";
import PublicRoute from "../PublicRoute";
import ForgotPassword from "./Components/ForgotPassword";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Navbar from "./Components/Navbar";
import ResetPassword from "./Components/ResetPassword";
import { login, logout } from "./Redux/Slices/AuthSlice";
import CollabSection from "./Components/CollabSection";
import CodeEditor from "./Pages/CodeEditor";
import ShareScreen from "./Components/Share System/ShareScreen";
import ShareSettingsModal from "./Components/Share System/ShareSettingsModal";
import { useLocation as useReactRouterLocation } from "react-router-dom";

function AppWrapper() {
  const location = useReactRouterLocation();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");

    if (token && user) {
      try {
        dispatch(login({ token, user: JSON.parse(user) }));
      } catch (err) {
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }, []);

  // 👇 Hide Navbar only on /codeeditor
  const hideNavbarRoutes = ["/codeeditor"];
  const showNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}
      {/* <Navbar/> */}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/signup" element={<PublicRoute><SignUp /></PublicRoute>} />
        <Route path="/forgotPassword" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
        <Route path="/reset-password/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
        <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
        <Route path="/collab-section" element={<PrivateRoute><CollabSection /></PrivateRoute>} />
        <Route path="/share" element={<PrivateRoute><ShareScreen /></PrivateRoute>} />
        <Route path="/sharesetting" element={<PrivateRoute><ShareSettingsModal /></PrivateRoute>} />
        <Route path="/codeeditor" element={<PrivateRoute><CodeEditor /></PrivateRoute>} />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

export default App;
