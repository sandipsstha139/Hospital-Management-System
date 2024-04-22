import express from "express";
import { getALLMessage, sendMessage } from '../controllers/message.controller.js';

const Router = express.Router();

Router.route("/send").post(sendMessage);
Router.route("/").get(getALLMessage);

export default Router;