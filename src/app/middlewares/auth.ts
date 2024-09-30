import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";

import { User } from "../modules/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: ["admin" | "user"]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    // checking if the token is missing
    if (!token) {
      throw new AppError(401, "You are not authorized!");
    }

    const tokenArray = token?.split(" ");
    // checking if the given token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        tokenArray[1],
        config.jwt_accessToken_secret as string
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(401, "Unauthorized");
    }

    const { email, role, iat } = decoded;

    // checking if the user is exist
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new AppError(404, "This user is not found !");
    }

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number
      )
    ) {
      throw new AppError(401, "You are not authorized !");
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized");
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
