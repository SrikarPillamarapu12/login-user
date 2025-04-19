import express from "express";
import { loginHandler } from "../controllers/auth.controller";
import {loginSchema } from "../schemas/auth.schema";
import  {validate } from "../middleware/validate";

const router = express.Router();

router.post("/login", validate(loginSchema), loginHandler);

export default router;
