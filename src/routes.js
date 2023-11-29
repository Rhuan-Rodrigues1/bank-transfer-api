const express = require("express");
const { createUser } = require("./controllers/createUserController");

const router = express.Router();

router.post("/create", async (req, res) => {
  await createUser(req, res);
});

module.exports = router;
