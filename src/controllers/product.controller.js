// src/controllers/product.controller.js
import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getAllProducts = async (req, res) => {
  try {
    // Pagination parameters
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    const products = await Product.findAll({ limit, offset });
    return sendSuccess(res, 'Products retrieved successfully', { products, page, limit });
  } catch (error) {
    return sendError(res, 'Error retrieving products', error.message);
  }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return sendError(res, 'Product not found', null, 404);
    }
    return sendSuccess(res, 'Product retrieved successfully', product);
  } catch (error) {
    return sendError(res, 'Error retrieving product', error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const { name, category, description, price, stock, imageUrl } = req.body;
    const product = await Product.create({ name, category, description, price, stock, imageUrl });
    return sendSuccess(res, 'Product created successfully', product, 201);
  } catch (error) {
    return sendError(res, 'Error creating product', error.message);
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, stock, imageUrl } = req.body;
    const product = await Product.findByPk(id);
    if (!product) {
      return sendError(res, 'Product not found', null, 404);
    }
    await product.update({ name, category, description, price, stock, imageUrl });
    return sendSuccess(res, 'Product updated successfully', product);
  } catch (error) {
    return sendError(res, 'Error updating product', error.message);
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    if (!product) {
      return sendError(res, 'Product not found', null, 404);
    }
    await product.destroy();
    return sendSuccess(res, 'Product deleted successfully');
  } catch (error) {
    return sendError(res, 'Error deleting product', error.message);
  }
};