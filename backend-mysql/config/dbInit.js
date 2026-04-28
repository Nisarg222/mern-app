const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(`✅ MySQL Connected via Sequelize: ${process.env.DB_HOST}:${process.env.DB_PORT}`);

    // Creates tables that don't exist yet; never drops or alters existing ones
    await sequelize.sync();
    console.log("✅ Database synced");
  } catch (error) {
    console.error(`❌ MySQL connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
