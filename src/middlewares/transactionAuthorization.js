const authorization = require("../utils/mock/authorizate");

const statusMockExtern = {
  1: "Autorizado",
};

async function transactionAuthorization(req, res, next) {
  const data = await authorization();

  if (data.message == statusMockExtern[1]) {
    return next();
  } else {
    res.status(401).send({
      message: "Unauthorized transfer",
    });
  }
}

module.exports = transactionAuthorization;
