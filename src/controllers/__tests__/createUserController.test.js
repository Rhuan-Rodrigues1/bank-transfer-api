const request = require("supertest");
const Users = require("../../models/Users");
const { app } = require("../../app");

const dataUserCommon = {
  name: "Rhuan",
  last_name: "Rodrigues",
  cpf: "123134235",
  cnpj: "",
  email: "asd@asd",
  password: "123",
  balance: 1000,
  user_type: "common",
  balance: 1000,
};

const dataUserStore = {
  name: "RhuanStore",
  last_name: "Rodrigues",
  cpf: "1231342353",
  cnpj: "",
  email: "asd2@asd",
  password: "1233",
  balance: 1000,
  user_type: "store",
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
