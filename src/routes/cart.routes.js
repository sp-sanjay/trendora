// src/routes/cart.routes.js
import express from 'express';
import Joi from 'joi';
import { getCartItems, addToCart, updateCartItem, removeCartItem } from '../controllers/cart.controller.js';
import { validateQuery, validateBody } from '../middleware/validate.js';

const router = express.Router();

// Pagination schema for cart items
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

// Schema for cart item payload
const cartItemSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  quantity: Joi.number().integer().min(1).optional(),
});

router.get('/', validateQuery(paginationSchema), getCartItems);
router.post('/', validateBody(cartItemSchema), addToCart);
router.put('/:id', validateBody(cartItemSchema), updateCartItem);
router.delete('/:id', removeCartItem);

export default router;