// src/controllers/auth.controller.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const register = async (req, res) => {
  try {
    // Payload validated in route using JOI middleware if set up
    const { name, email, password, userRole } = req.body;
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return sendError(res, 'User already exists', null, 400);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role: userRole ?? 'user' });
    return sendSuccess(res, 'User registered successfully', user, 201);
  } catch (error) {
    return sendError(res, 'Error registering user', error.message);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return sendError(res, 'Invalid credentials', null, 400);
    }
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) {
      return sendError(res, 'Invalid credentials', null, 400);
    }
    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
    return sendSuccess(res, 'Login successful', { token });
  } catch (error) {
    return sendError(res, 'Error logging in', error.message);
  }
};