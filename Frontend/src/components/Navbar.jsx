import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "./../context/Context";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";

const Navbar = () => {
  // eslint-disable-next-line no-unused-vars
  const [show, setShow] = useState(false);
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await apiRequest
      .get("users/patient/logout")
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <nav className="container">
      <div className="logo">HealthCare</div>
      <div className={show ? "navLinks showmenu" : "navLinks"}>
        <div className="links">
          <Link to={"/"}>Home</Link>
          <Link to={"/appointment"}>Appointment</Link>
          <Link to={"/about"}>AboutUs</Link>
        </div>
        {isAuthenticated ? (
          <button className="logoutBtn btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <button className="logoutBtn btn" onClick={handleLogin}>
            Login
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;
