const Users = require("../models/Users");
const Transactions = require("../models/Transactions");
const CircuitBreaker = require("opossum");

async function httpCall() {
  fetch("https://run.mocky.io/v3/5794d450-d2e2-4412-8131-73d0293ac1cc")
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

module.exports = {
  createTransaction: (req, res) => {
    const { sender_id, receiver_id, value } = req.body;

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
      .on("success", () => console.log("SUCCESS"))
      .on("fallback", () => console.log("FALLBACK"))
      .fallback(() => {
        const transactionFallback = Transactions.create({
          sender_id: sender_id,
          receiver_id: receiver_id,
          value: 0,
        });
        return transactionFallback;
      });
  },
};
