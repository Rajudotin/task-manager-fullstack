const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./docs/swagger');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

app.use(express.json());
app.use(helmet());
const allowedOrigins = [
  "http://localhost:5173",
  "https://task-manager-fullstack-rouge.vercel.app",
  "https://task-manager-fullstack-pfv2pvomo-rajus-projects-3ceb58b0.vercel.app",
  "https://task-manager-fullstack-rajus-projects-3ceb58b0.vercel.app",
  "https://task-manager-fullstack-d74vuuhju-rajus-projects-3ceb58b0.vercel.app",
  "https://task-manager-fullstack-tawny.vercel.app",
  "https://task-manager-fullstack-git-main-rajus-projects-3ceb58b0.vercel.app",
  "https://task-manager-fullstack-669blzk4y-rajus-projects-3ceb58b0.vercel.app"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;