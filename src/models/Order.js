// src/models/Order.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Order = db.define(
  'Order',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'cancelled'),
      defaultValue: 'pending'
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  },
  {
    indexes: [
      { fields: ['userId'] },
      { fields: ['status'] }
    ]
  }
);

export default Order;