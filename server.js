// server.js - Entry point
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import db from './src/config/db.js';
import './src/models/index.js'; // Import the models to register them with Sequelize
import routes from './src/routes/index.js';
import errorHandler from './src/middleware/errorHandler.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Routes
app.use('/v1', routes);

// Error Handling Middleware
app.use(errorHandler);

// Connect to DB and Sync Models
db.authenticate()
  .then(() => {
    console.log('✅ Database connected successfully.');

    return db.sync({ alter: true }); // Change to { force: true } only if you want to reset tables
  })
  .then(() => {
    console.log('✅ All models synchronized successfully.');

    // Start Server only after DB sync
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error('❌ Database connection failed:', err));

  app.get('/', (req, res) => {
    res.send('Welcome to Trendora!!');
  });