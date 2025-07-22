const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./tasklist.sqlite",
});

module.exports = sequelize;
