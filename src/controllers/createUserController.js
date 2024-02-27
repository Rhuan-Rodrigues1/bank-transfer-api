const Users = require("../models/Users");
const RequestError = require("../utils/errors/errorHandler");

const typeUsers = {
  common: "common",
  store: "store",
};

module.exports = {
  createUser: async (req, res) => {
    const { name, lastName, cpf, cnpj, email, password, typeUser, balance } =
      req.body;

    if (typeUser != typeUsers.common && typeUser != typeUsers.store) {
      res.status(417).send({
        message: "the type of user must be: common or store",
      });
    } else {
      try {
        const user = await Users.create({
          name: name,
          last_name: lastName,
          cpf: cpf,
          cnpj: cnpj,
          email: email,
          password: password,
          user_type: typeUser,
          balance: balance,
        });

        res.status(200).send({
          message: "Account create",
          data: user,
        });
      } catch (error) {
        console.log(error);
      }
    }
  },
};
