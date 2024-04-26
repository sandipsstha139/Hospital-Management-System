import express from "express";
import { getAllMessages, sendMessage } from '../controllers/message.controller.js';
import { isAdminAuthenticated } from '../middleware/auth.js';

const Router = express.Router();

Router.route("/send").post(sendMessage);
Router.route("/getall").get(isAdminAuthenticated ,getAllMessages);

export default Router;