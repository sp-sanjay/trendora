// src/controllers/wishlist.controller.js
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getWishlistItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const wishlistItems = await Wishlist.findAll({ where: { userId }, limit, offset });
    return sendSuccess(res, 'Wishlist items retrieved successfully', { wishlistItems, page, limit });
  } catch (error) {
    return sendError(res, 'Error retrieving wishlist items', error.message);
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;
    const product = await Product.findByPk(productId);
    if (!product) {
      return sendError(res, 'Product not found', null, 404);
    }
    const existingItem = await Wishlist.findOne({ where: { userId, productId } });
    if (existingItem) {
      return sendError(res, 'Product already in wishlist', null, 400);
    }
    const wishlistItem = await Wishlist.create({ userId, productId });
    return sendSuccess(res, 'Product added to wishlist', wishlistItem, 201);
  } catch (error) {
    return sendError(res, 'Error adding to wishlist', error.message);
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const wishlistItem = await Wishlist.findOne({ where: { id, userId } });
    if (!wishlistItem) {
      return sendError(res, 'Wishlist item not found', null, 404);
    }
    await wishlistItem.destroy();
    return sendSuccess(res, 'Wishlist item removed');
  } catch (error) {
    return sendError(res, 'Error removing from wishlist', error.message);
  }
};