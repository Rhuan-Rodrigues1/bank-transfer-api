const express = require("express");
const { createUser } = require("./controllers/createUserController");
const {
  createTransaction,
} = require("./controllers/transactionUserController");
const transactionAuthorization = require("./middlewares/transactionAuthorization");

const router = express.Router();

router.post("/create", async (req, res) => {
  await createUser(req, res);
});

router.post("/transfer", transactionAuthorization, async (req, res) => {
  await createTransaction(req, res);
});

module.exports = router;
