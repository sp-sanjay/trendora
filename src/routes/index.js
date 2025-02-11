// src/routes/index.js
import express from 'express';
import authRoutes from './auth.routes.js';
import productRoutes from './product.routes.js';
import cartRoutes from './cart.routes.js';
import orderRoutes from './order.routes.js';
import wishlistRoutes from './wishlist.routes.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/products', productRoutes);

// These routes require authentication
router.use('/cart', authMiddleware, cartRoutes);
router.use('/orders', authMiddleware, orderRoutes);
router.use('/wishlist', authMiddleware, wishlistRoutes);

export default router;