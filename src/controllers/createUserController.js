const Users = require("../models/Users");

module.exports = {
  createUser: async (req, res) => {
    const { name, lastName, cpf, cnpj, email, password, typeUser, balance } =
      req.body;

    /*if (Users.findOne(email)) {
      res.status(400).send({
        message: "email already exists !",
      });
    } */

    try {
      await Users.create({
        name: name,
        last_name: lastName,
        cpf: cpf,
        cnpj: cnpj,
        email: email,
        password: password,
        user_type: typeUser,
        balance: balance,
      });

      res.status(200).send("Account create");
    } catch (error) {
      throw new Error(error);
    }
  },
};
