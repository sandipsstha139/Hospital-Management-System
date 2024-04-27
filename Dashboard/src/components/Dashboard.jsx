import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
import { toast } from "react-toastify";

const Dashboard = () => {
  const { isAuthenticated, user } = useContext(Context);
  const [appointments, setAppointments] = useState([]);

  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);


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
    const fetchAppointments = async () => {
      try {
        const { data } = await apiRequest.get("/appointment/getall");
        setAppointments(data.appointments);
      } catch (err) {
        setAppointments([]);
        console.log(err);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await apiRequest.put(
        `/appointment/update/${appointmentId}`,
        { status }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);
  return (
    <>
      <section className="dashboard page">
        <div className="banner">
          <div className="firstBox">
            <img src="/doc.png" alt="doctor Image" />
            <div className="content">
              <div>
                <p>Hello,</p>
                <h4>{user && `${user.firstName} ${user.lastName}`}</h4>
              </div>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Magnam
                explicabo qui iste ipsa expedita veritatis nulla maiores est
                dicta ullam.
              </p>
            </div>
          </div>
          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>{appointments.length}</h3>
          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{doctors.length}</h3>
          </div>
        </div>
        <div className="banner">
          <h5>Appointments</h5>
          <table>
            <thead>
              <tr>
                <th>Patient</th>
                <th>Date</th>
                <th>Doctor</th>
                <th>Department</th>
                <th>Status</th>
                <th>Visited</th>
              </tr>
            </thead>
            <tbody>
              {appointments && appointments.length > 0 ? (
                appointments.map((appointment) => {
                  return (
                    <tr key={appointment._id}>
                      <td>
                        {appointment.firstName} {appointment.lastName}
                      </td>
                      <td>
                        {appointment.appointment_date
                          ? appointment.appointment_date.substring(0, 16)
                          : ""}
                      </td>
                      <td>{`${appointment.doctor.firstName} ${appointment.doctor.lastName}`}</td>
                      <td>{appointment.department}</td>
                      <td>
                        <select
                          className={
                            appointment.status === "Pending"
                              ? "value-pending"
                              : appointment.status === "Rejected"
                              ? "value-rejected"
                              : "value-accepted"
                          }
                          value={appointment.status}
                          onChange={(e) =>
                            handleUpdateStatus(appointment._id, e.target.value)
                          }
                        >
                          <option value="Pending" className="value-pending">
                            Pending
                          </option>
                          <option value="Accepted" className="value-accepted">
                            Accepted
                          </option>
                          <option value="Rejected" className="value-rejected">
                            Rejected
                          </option>
                        </select>
                      </td>
                      <td>
                        {appointment.hasVisited === true ? (
                          <GoCheckCircleFill className="green" />
                        ) : (
                          <AiFillCloseCircle className="red" />
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6">No Appointments Found!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default Dashboard;
