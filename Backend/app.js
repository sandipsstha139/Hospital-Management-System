import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from 'express-fileupload';

import globalErrorHandler from "./controllers/error.controller.js"
import messageRoute from "./routes/message.route.js"
import userRoute from "./routes/user.route.js"

const app = express();

// MIDDLEWARES
app.use(
  cors({
    origin: [process.env.FRONTEND_URL_ONE, process.env.FRONTEND_URL_TWO],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}))
app.use(morgan("dev"));

// ROUTES
app.use("/api/v1/message", messageRoute);
app.use("/api/v1/users", userRoute);

app.use(globalErrorHandler);
// EXPORT APP
export default app;