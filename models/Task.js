const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Task = sequelize.define("Task", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: DataTypes.TEXT,
  isCompleted: { type: DataTypes.BOOLEAN, defaultValue: false },
  isNew: { type: DataTypes.BOOLEAN, defaultValue: true },
  targetDate: DataTypes.DATE,
  creationDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});

module.exports = Task;
