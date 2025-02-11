// src/routes/wishlist.routes.js
import express from 'express';
import Joi from 'joi';
import { getWishlistItems, addToWishlist, removeFromWishlist } from '../controllers/wishlist.controller.js';
import { validateQuery, validateBody } from '../middleware/validate.js';

const router = express.Router();

// Pagination schema for wishlist items
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

// Schema for wishlist payload
const wishlistSchema = Joi.object({
  productId: Joi.string().uuid().required(),
});

router.get('/', validateQuery(paginationSchema), getWishlistItems);
router.post('/', validateBody(wishlistSchema), addToWishlist);
router.delete('/:id', removeFromWishlist);

export default router;