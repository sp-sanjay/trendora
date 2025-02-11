// src/models/Cart.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Cart = db.define(
  'Cart',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    indexes: [
      { fields: ['userId'] },
      { fields: ['productId'] }
    ]
  }
);

export default Cart;