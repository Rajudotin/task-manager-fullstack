const app = require('./src/app');
const { connectDB, sequelize } = require('./src/config/database');

const User = require('./src/models/User');
const Task = require('./src/models/Task');

User.hasMany(Task, { foreignKey: "userId", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "userId" });

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true });

    console.log("Database synced");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Startup failed:", error);
    process.exit(1);
  }
};

startServer();