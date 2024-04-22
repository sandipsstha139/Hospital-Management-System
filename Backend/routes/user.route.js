import express from "express";
import {
  addNewAdmin,
  login,
  patientRegister,
} from "../controllers/user.controller.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const Router = express.Router();

Router.route("/patient/register").post(patientRegister);
Router.route("/login").post(login);
Router.route("/admin/addnew").post(isAdminAuthenticated, addNewAdmin);

export default Router;
