// src/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import { sendError } from '../utils/responseHandler.js';

export default function authMiddleware(req, res, next) {
  let token = req.header('Authorization');
  token = token ? token.replace('Bearer ', '') : null;
  if (!token) {
    return sendError(res, 'Access Denied: No token provided', null, 401);
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // Attach the user info to the request for later use
    next();
  } catch (err) {
    return sendError(res, 'Invalid Token', err.message, 400);
  }
}