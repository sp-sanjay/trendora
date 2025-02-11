// src/controllers/cart.controller.js
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const cartItems = await Cart.findAll({ where: { userId }, limit, offset });
    return sendSuccess(res, 'Cart items retrieved successfully', { cartItems, page, limit });
  } catch (error) {
    return sendError(res, 'Error retrieving cart items', error.message);
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    // Verify product exists
    const product = await Product.findByPk(productId);
    if (!product) {
      return sendError(res, 'Product not found', null, 404);
    }
    let cartItem = await Cart.findOne({ where: { userId, productId } });
    if (cartItem) {
      cartItem.quantity += quantity || 1;
      await cartItem.save();
    } else {
      cartItem = await Cart.create({ userId, productId, quantity: quantity || 1 });
    }
    return sendSuccess(res, 'Item added to cart', cartItem, 201);
  } catch (error) {
    return sendError(res, 'Error adding item to cart', error.message);
  }
};

export const updateCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params; // cart item id
    const { quantity } = req.body;
    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return sendError(res, 'Cart item not found', null, 404);
    }
    cartItem.quantity = quantity;
    await cartItem.save();
    return sendSuccess(res, 'Cart item updated', cartItem);
  } catch (error) {
    return sendError(res, 'Error updating cart item', error.message);
  }
};

export const removeCartItem = async (req, res) => {
  try {
    const userId = req.user.id;
    const { id } = req.params;
    const cartItem = await Cart.findOne({ where: { id, userId } });
    if (!cartItem) {
      return sendError(res, 'Cart item not found', null, 404);
    }
    await cartItem.destroy();
    return sendSuccess(res, 'Cart item removed');
  } catch (error) {
    return sendError(res, 'Error removing cart item', error.message);
  }
};