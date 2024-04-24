import { Message } from "../models/message.model.js";
import catchAsync from "../middleware/catchAsync.js";
import AppError from "../middleware/appError.js";

export const sendMessage = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phone, message } = req.body;
  if (!firstName || !lastName || !email || !phone || !message) {
    return next(new AppError("Please Fill the Form completely!", 400));
  }
  await Message.create({ firstName, lastName, email, phone, message });
  res.status(200).json({
    success: true,
    message: "Message send successfully!",
  });
});
export const getAllMessages = catchAsync(async (req, res, next) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    messages,
  });
});
