import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const { isAuthenticated } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await apiRequest.get("/users/doctors");
        setDoctors(data.doctors);
      } catch (err) {
        console.log(err.response.data.message);
      }
    };
    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <section className="page doctors">
        <h1>Doctors</h1>
        <div className="banner">
          {doctors && doctors.length > 0 ? (
            doctors.map((element, index) => (
              <div className="card" key={index}>
                <div>
                  <img
                    src={element.docAvatar && element.docAvatar.url}
                    alt="doctor Avatar"
                  />
                  <h4>{`${element.firstName} ${element.lastName}`}</h4>
                </div>
                <div className="details">
                  <p>
                    Email: <span>{element.email}</span>
                  </p>
                  <p>
                    Phone: <span>{element.phone}</span>
                  </p>
                  <p>
                    DOB: <span>{element.dob.substring(0, 10)}</span>
                  </p>
                  <p>
                    Department: <span>{element.doctorDepartment}</span>
                  </p>
                  <p>
                    NIC: <span>{element.nic}</span>
                  </p>
                  <p>
                    Gender: <span>{element.gender}</span>
                  </p>
                </div>
              </div>
            ))
          ) : (
            <h1>No messages Available</h1>
          )}
        </div>
      </section>
    </>
  );
};

export default Doctors;
