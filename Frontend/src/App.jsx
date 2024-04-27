/* eslint-disable react-hooks/exhaustive-deps */
import AboutUs from "./pages/AboutUs";
import Appointment from "./pages/Appointment";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/Navbar";
import { useContext, useEffect } from "react";
import { Context } from "./context/Context";
import apiRequest from "./lib/apiRequest";

const App = () => {
  const { isAuthenticated, setIsAuthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest.get("/users/patient/me");
        console.log(res);
        setIsAuthenticated(true);
        setUser(res.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setUser({});
      }
    };

    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/appointment" element={<Appointment />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
        <ToastContainer position="top-center" />
      </Router>
    </>
  );
};
export default App;
