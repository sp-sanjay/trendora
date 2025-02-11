// src/routes/auth.routes.js
import express from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { validateBody } from '../middleware/validate.js';
import Joi from 'joi';

const router = express.Router();

// JOI Schemas for validation
const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  userRole: Joi.string().valid('user', 'admin').optional(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

router.post('/register', validateBody(registerSchema), register);
router.post('/login', validateBody(loginSchema), login);

export default router;