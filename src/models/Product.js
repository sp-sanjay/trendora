// src/models/Product.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Product = db.define(
  'Product',
  {
    id: { 
      type: DataTypes.UUID, 
      defaultValue: DataTypes.UUIDV4, 
      primaryKey: true 
    },
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    category: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    description: { 
      type: DataTypes.TEXT 
    },
    price: { 
      type: DataTypes.FLOAT, 
      allowNull: false 
    },
    stock: { 
      type: DataTypes.INTEGER, 
      defaultValue: 0 
    },
    imageUrl: { 
      type: DataTypes.STRING 
    },
    rating: { 
      type: DataTypes.FLOAT, 
      defaultValue: 0 
    }
  },
  {
    indexes: [
      { fields: ['category'] },
      { fields: ['price'] },
      { fields: ['rating'] }
    ]
  }
);

export default Product;