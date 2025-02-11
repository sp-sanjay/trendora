// src/controllers/order.controller.js
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { sendSuccess, sendError } from '../utils/responseHandler.js';

export const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;
    const orders = await Order.findAll({ where: { userId }, limit, offset });
    return sendSuccess(res, 'Orders retrieved successfully', { orders, page, limit });
  } catch (error) {
    return sendError(res, 'Error retrieving orders', error.message);
  }
};

export const createOrder = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.findAll({ where: { userId } });
    if (cartItems.length === 0) {
      return sendError(res, 'Cart is empty', null, 400);
    }
    let totalPrice = 0;
    for (const item of cartItems) {
      const product = await Product.findByPk(item.productId);
      if (product) {
        totalPrice += product.price * item.quantity;
      }
    }
    const order = await Order.create({ userId, totalPrice, status: 'pending' });
    // Clear the cart after order creation
    await Cart.destroy({ where: { userId } });
    return sendSuccess(res, 'Order created successfully', order, 201);
  } catch (error) {
    return sendError(res, 'Error creating order', error.message);
  }
};