import express from "express";
import zodValidateRequest from "../../middleware/zodValidateRequest";
import { AuthZodValidation } from "./auth.zodValidation";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post(
  "/signup",
  zodValidateRequest(AuthZodValidation.loginZodSchema),
  AuthController.signupUser
);

router.post(
  "/login",
  zodValidateRequest(AuthZodValidation.loginZodSchema),
  AuthController.loginUser
);

router.post(
  "/refresh-token",
  zodValidateRequest(AuthZodValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
