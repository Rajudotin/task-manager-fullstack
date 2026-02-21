const { sequelize } = require('./src/config/database');
require('./src/models');

(async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');
  process.exit();
})();