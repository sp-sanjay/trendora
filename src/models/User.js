// src/models/User.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define(
  'User',
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
    email: { 
      type: DataTypes.STRING, 
      unique: true, 
      allowNull: false 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },
    role: { 
      type: DataTypes.ENUM('user', 'admin'), 
      defaultValue: 'user' 
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      }
    ]
  }
);

export default User;