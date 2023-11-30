const request = require("supertest");
const Users = require("../../models/Users");
const { app } = require("../../app");

const dataUserCommon = {
  name: "RhuanStore",
  lastName: "Rodrigues",
  cpf: "1231342353",
  cnpj: "",
  email: "asd2@asd",
  password: "1233",
  balance: 1000,
  typeUser: "store",
};

describe("Test Contoller", () => {
  beforeEach(async () => {
    await Users.drop();
  });
  it("should return ok when account created successfully", async () => {
    const res = await request(app).post("/create").send(dataUserCommon);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe(`Account create`);
  });
});
