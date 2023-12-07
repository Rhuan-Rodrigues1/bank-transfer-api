const Users = require("../models/Users");

module.exports = {
  createUser: async (req, res) => {
    const { name, lastName, cpf, cnpj, email, password, typeUser, balance } =
      req.body;

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
  },
};
