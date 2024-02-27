const request = require("supertest");
const Users = require("../../models/Users");
const { app } = require("../../app");

describe("Test Contoller", () => {
  it("should return ok when account created successfully", async () => {
    beforeEach(async () => {
      await Users.drop();
    });
    const res = await request(app).post("/create").send({
      name: "names2df",
      lastName: "la2stNamesdf",
      cpf: "122",
      email: "eas23d",
      password: "passwoasdrd",
      typeUser: "common",
      balance: 1000,
    });

    console.log(res);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Account create");
  });
});
