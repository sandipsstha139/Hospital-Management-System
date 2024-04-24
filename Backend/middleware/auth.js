import catchAsync from "./catchAsync.js";
import AppError from "./appError.js";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const isAdminAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.cookies.adminToken;
  console.log(token);

  if (!token) {
    return next(new AppError("Admin is not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Admin") {
    return next(
      new AppError(`${req.user.role} not authorized for this resource`, 403)
    );
  }
  next();
});

export const isPatientAuthenticated = catchAsync(async (req, res, next) => {
  const token = req.cookies.patientToken;
  console.log(token);

  if (!token) {
    return next(new AppError("Patient is not Authenticated!", 400));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  console.log(decoded);

  req.user = await User.findById(decoded.id);
  if (req.user.role !== "Patient") {
    return next(
      new AppError(`${req.user.role} not authorized for this resource`, 403)
    );
  }
  next();
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(`${req.user.role} not allowed to acess this resource`)
      );
    }
  };
};
