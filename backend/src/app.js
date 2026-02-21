const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const { connectDB } = require('./config/database');
require('./models');

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

connectDB();

app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://https://task-manager-fullstack-rouge.vercel.app"
  ],
  credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;