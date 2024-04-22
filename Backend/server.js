import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

import app from "./app.js";
import mongoose from "mongoose";
import cloudinary from "cloudinary";

const DB = process.env.DATABASE_URL;

mongoose.connect(DB).then(() => {
  console.log("DATABASE Connection Successful!");
});

console.log(process.env.NODE_ENV);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on ${port}...`);
});
