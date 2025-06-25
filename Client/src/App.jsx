import { BrowserRouter, Route, Routes } from "react-router-dom";
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


function App() {
  const mode = useSelector((state) => state.theme.mode)

  useEffect (() => {
    document.documentElement.setAttribute("data-theme", mode)
  }, [mode])

  return (
    <>
      <BrowserRouter>
          <Navbar/>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/forgot-password"
            element={
              <PublicRoute>
                <ForgotPassword />
              </PublicRoute>
            }
          />
          <Route path="/resetPassword/:token" element={<PublicRoute><ResetPassword /></PublicRoute>} />
          <Route
            path="/signup"
            element={
              <PublicRoute>
                <SignUp />
              </PublicRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <HomePage />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="bottom-right" autoClose={3000} />
    </>
  );
}

export default App;
