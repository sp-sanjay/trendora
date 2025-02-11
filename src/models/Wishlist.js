// src/models/Wishlist.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Wishlist = db.define(
  'Wishlist',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
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

export default Wishlist;