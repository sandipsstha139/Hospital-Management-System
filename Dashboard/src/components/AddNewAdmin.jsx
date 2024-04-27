import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../lib/apiRequest";
import { toast } from "react-toastify";
import { Context } from "../context/Context";

function AddNewAdmin() {
  const [isLoading, setIsLoading] = useState(false);

  const { isAuthenticated } = useContext(Context);

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
      const response = await apiRequest.post("/users/admin/addnew", {
        firstName,
        lastName,
        email,
        phone,
        nic,
        dob,
        gender,
        password,
        role: "Admin",
      });
      toast.success(response.data.message);
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <section className="page">
      <div className="container form-component add-admin-form">
        <h1
          style={{
            margin: 15,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Add New Admin
        </h1>
        <form onSubmit={handleSubmit}>
          <input name="firstName" type="text" placeholder="First Name" />
          <input name="lastName" type="text" placeholder="Last Name" />

          <input
            name="email"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Email"
          />
          <input name="phone" type="number" placeholder="Phone" />

          <input name="nic" type="number" placeholder="NIC" />
          <input name="dob" type="date" placeholder="Date Of Birth" />

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

          <button disabled={isLoading} type="submit">
            Register
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddNewAdmin;
