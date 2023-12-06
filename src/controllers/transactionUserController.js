const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const CircuitBreaker = require("opossum");

async function httpCall() {
  fetch("https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc")
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

module.exports = {
  createTransaction: async (req, res) => {
    const { senderId, receiverId, value } = req.body;

    const circuitBreakerOptions = {
      timeout: 3000,
      errorThresholdPercentage: 50,
      resetTimeout: 10000,
    };

    const circuitBreaker = new CircuitBreaker(httpCall, circuitBreakerOptions);

    circuitBreaker
      .on("close", () => console.log("CLOSE"))
      .on("open", () => console.log("OPEN"))
      .on("halfOpen", () => console.log("HALF"))
      .on("success", () => {
        try {
          const userTransaction = Transactions.create({
            sender_id: senderId,
            receiver_id: receiverId,
            value: value,
          });

          const userSender = Users.findOne(senderId);
          const userReceiver = Users.findOne(receiverId);

          userSender.balance -= value;
          userReceiver.balance += value;

          return res.status(200).send({
            message: "Transaction success",
            data: userTransaction,
          });
        } catch (error) {
          console.log(error);
        }
      })
      .on("fallback", () => console.log("FALLBACK"))
      .fallback(() => {
        const transactionFallback = Transactions.create({
          sender_id: senderId,
          receiver_id: receiverId,
          value: 0,
        });
        return transactionFallback;
      });
  },
};
