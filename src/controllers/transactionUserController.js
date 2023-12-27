const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const RequestError = require("../utils/errors/errorHandler");

module.exports = {
  createTransaction: async (req, res) => {
    const { senderId, receiverId, value } = req.body;
    const userSender = await Users.findByPk(senderId);
    const userReceiver = await Users.findByPk(receiverId);

    if (userSender.user_type == "common" && userSender.balance >= 0) {
      try {
        const userTransaction = await Transactions.create({
          sender_id: senderId,
          receiver_id: receiverId,
          value: value,
        });

        userSender.balance -= value;
        userReceiver.balance += value;

        await userSender.save();
        await userReceiver.save();

        return res.status(200).send({
          message: "Transaction success",
          data: userTransaction,
        });
      } catch (error) {
        throw new RequestError(error);
      }
    } else {
      res.status(401).send({
        message: "User without authorization to perform such action",
      });
    }
  },
};
