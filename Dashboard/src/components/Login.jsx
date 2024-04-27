import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
        role: "Admin",
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

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  return (
    <div className="container form-component">
      <h1 className="form-title">Welcome to HealthCare</h1>
      <p>Only Admin are Allowed to Acess these Resources</p>
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
      </form>
    </div>
  );
}

export default Login;
