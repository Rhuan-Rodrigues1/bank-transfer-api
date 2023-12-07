const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const RequestError = require("../utils/errors/errorHandler");
const axios = require("axios");

async function httpCall() {
  const response = await axios.get(
    "https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc"
  );

  return response.data;
}

module.exports = {
  createTransaction: async (req, res) => {
    const { senderId, receiverId, value } = req.body;

    try {
      const userTransaction = await Transactions.create({
        sender_id: senderId,
        receiver_id: receiverId,
        value: value,
      });
      const userSender = await Users.findByPk(senderId);
      const userReceiver = await Users.findByPk(receiverId);

      userSender.balance -= value;
      userReceiver.balance += value;

      await userSender.save();
      await userReceiver.save();

      return res.status(200).send({
        message: "Transaction success",
        data: userTransaction,
      });
    } catch (error) {
      throw new RequestError("Transaction Fail", 500, error);
    }
  },
};
