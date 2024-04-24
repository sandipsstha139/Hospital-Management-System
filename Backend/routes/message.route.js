import express from "express";
import { getAllMessages, sendMessage } from '../controllers/message.controller.js';
import { isAdminAuthenticated, isPatientAuthenticated } from '../middleware/auth.js';

const Router = express.Router();

Router.route("/send").post(sendMessage);
// Router.route("/getall").get(getAllMessages);
Router.route("/getall").get(isPatientAuthenticated ,getAllMessages);

export default Router;