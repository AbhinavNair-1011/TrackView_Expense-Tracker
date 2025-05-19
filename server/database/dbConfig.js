const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: process.env.DATABASE_HOST,
    dialect: process.env.DATABASE_DIALECT,
    logging: false,
  }
);

const dbConnect = (cb) => {
  sequelize.authenticate()
    .then(() => {
      console.log("Connected to database");
      if (process.env.DATABASE_SYNC === "true") {
        console.log("Warning databse sync is on")
        sequelize.sync({ alter: "true" })
       console.log("Database sync completed")

      }

      cb();

    })
    .catch((err) => {
      console.error("Database connection error:", err);
    });
};

module.exports = { dbConnect, sequelize };
