// src/routes/order.routes.js
import express from 'express';
import Joi from 'joi';
import { getOrders, createOrder } from '../controllers/order.controller.js';
import { validateQuery } from '../middleware/validate.js';

const router = express.Router();

// Pagination schema for orders
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

router.get('/', validateQuery(paginationSchema), getOrders);
router.post('/', createOrder);

export default router;