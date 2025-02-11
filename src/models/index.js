// src/models/index.js
import User from './User.js';
import Product from './Product.js';
import Cart from './Cart.js';
import Order from './Order.js';
import Wishlist from './Wishlist.js';

// Associations

// A User can have many Orders
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// A User can have many Products in their Cart (Many-to-Many via Cart table)
User.belongsToMany(Product, { through: Cart, foreignKey: 'userId', as: 'cartItems' });
Product.belongsToMany(User, { through: Cart, foreignKey: 'productId', as: 'usersCart' });

// A User can have many Products in their Wishlist (Many-to-Many via Wishlist table)
User.belongsToMany(Product, { through: Wishlist, foreignKey: 'userId', as: 'wishlist' });
Product.belongsToMany(User, { through: Wishlist, foreignKey: 'productId', as: 'wishlistedBy' });

export { User, Product, Cart, Order, Wishlist };