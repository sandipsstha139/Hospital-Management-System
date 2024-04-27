import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

function Login() {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirmPassword");

    try {
      const response = await apiRequest.post("/users/login", {
        email,
        password,
        confirmPassword,
        role: "Patient",
      });
      toast.success(response.data.message);
      setIsAuthenticated(true);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <div className="container form-component login-form">
      <h1 style={{ margin: 15 }}>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="email"
          required
          minLength={3}
          maxLength={20}
          type="text"
          placeholder="Email"
        />
        <input
          name="password"
          required
          type="password"
          placeholder="Password"
        />
        <input
          name="confirmPassword"
          required
          type="password"
          placeholder="Confirm Password"
        />
        <button disabled={isLoading} type="submit">
          Login
        </button>
        <Link to="/register">{"Don't"} you have an account?</Link>
      </form>
    </div>
  );
}

export default Login;
