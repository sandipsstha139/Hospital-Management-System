import express from "express";
import {
  deleteAppointment,
  getAllAppointments,
  postAppointment,
  updateAppointmentStatus,
} from "../controllers/appointment.controller.js";
import {
  isAdminAuthenticated,
  isPatientAuthenticated,
} from "../middleware/auth.js";

const Router = express.Router();

Router.route("/getall").get(isAdminAuthenticated, getAllAppointments);
Router.route("/post").post(isPatientAuthenticated, postAppointment);
Router.route("/update/:id").put(isAdminAuthenticated, updateAppointmentStatus);
Router.route("/delete/:id").delete(isAdminAuthenticated, deleteAppointment);

export default Router;
