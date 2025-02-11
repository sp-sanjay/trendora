// src/routes/product.routes.js
import express from 'express';
import Joi from 'joi';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { validateQuery, validateBody } from '../middleware/validate.js';
import authMiddleware from '../middleware/authMiddleware.js';
import { requireRole } from '../middleware/roleMiddleware.js';

const router = express.Router();

// JOI schema for pagination
const paginationSchema = Joi.object({
  page: Joi.number().integer().min(1).optional(),
  limit: Joi.number().integer().min(1).optional(),
});

// JOI schema for product
const productSchema = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  description: Joi.string().optional().allow(''),
  price: Joi.number().required(),
  stock: Joi.number().integer().min(0).required(),
  imageUrl: Joi.string().uri().optional().allow(''),
});

router.get('/', validateQuery(paginationSchema), getAllProducts);
router.get('/:id', getProductById);

router.post('/', authMiddleware, requireRole('admin'), validateBody(productSchema), createProduct);
router.put('/:id', authMiddleware, requireRole('admin'), validateBody(productSchema), updateProduct);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteProduct);

export default router;