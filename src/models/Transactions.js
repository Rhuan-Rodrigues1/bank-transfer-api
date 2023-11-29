const Sequelize = require("sequelize");
const database = require("../database/database");

const Transactions = database.define("transactions", {
  sender_id: {
    type: Sequelize.INTEGER,
  },

  receiver_id: {
    type: Sequelize.INTEGER,
  },
  value: {
    type: Sequelize.DOUBLE,
  },
});

module.exports = Transactions;
