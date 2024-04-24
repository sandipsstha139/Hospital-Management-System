import express from "express";
import {
  addNewAdmin,
  addNewDoctor,
  getAllDoctors,
  getAllUsers,
  getUserDetails,
  login,
  logoutAdmin,
  logoutPatient,
  patientRegister,
} from "../controllers/user.controller.js";
import { isAdminAuthenticated, isPatientAuthenticated } from "../middleware/auth.js";

const Router = express.Router();

Router.route("/patient/register").post(patientRegister);
Router.route("/login").post(login);
Router.route("/admin/addnew").post(isAdminAuthenticated, addNewAdmin);
Router.route("/doctors").get(getAllDoctors);
Router.route("/").get(getAllUsers);
Router.route("/admin/me").get(isAdminAuthenticated, getUserDetails);
Router.route("/patient/me").get(isPatientAuthenticated, getUserDetails);
Router.route("/admin/logout").get(isAdminAuthenticated, logoutAdmin);
Router.route("/patient/logout").get(isPatientAuthenticated, logoutPatient);
Router.route("/doctor/addnew").post(isAdminAuthenticated, addNewDoctor);

export default Router;
