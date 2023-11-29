const Sequelize = require("sequelize");
const database = require("../database/database");

const Users = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  last_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  cpf: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  cnpj: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  balance: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
  user_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Users;
