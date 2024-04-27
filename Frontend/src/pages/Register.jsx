import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

function Register() {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.target);

    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const nic = formData.get("nic");
    const dob = formData.get("dob");
    const gender = formData.get("gender");
    const password = formData.get("password");

    try {
      const response = await apiRequest.post("/users/patient/register", {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
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
    <div className="container form-component register-form">
      <h1 style={{ margin: 15, display:'flex', alignItems:'center', justifyContent:'center'}}>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="firstName" type="text" placeholder="First Name" />
          <input name="lastName" type="text" placeholder="Last Name" />
        </div>
        <div>
          <input
            name="email"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Email"
          />
          <input name="phone" type="number" placeholder="Phone" />
        </div>
        <div>
          <input name="nic" type="number" placeholder="NIC" />
          <input name="dob" type="date" placeholder="Date Of Birth" />
        </div>
        <div>
          <select name="gender">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>

          <input
            name="password"
            required
            type="password"
            placeholder="Password"
          />
        </div>

        <button disabled={isLoading} type="submit">
          Register
        </button>
        <Link to="/login">Already have an account?</Link>
      </form>
    </div>
  );
}

export default Register;
