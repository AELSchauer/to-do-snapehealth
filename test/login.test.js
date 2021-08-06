const expect = require("expect.js");
const request = require("supertest");

describe("GET /login", () => {
  it("return a login token if email is valid", () =>
    request("http://localhost:3000")
      .get("/login?email=test@email.com")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("object");
        expect(res.body).to.have.property("id");
        expect(res.body.id).to.be.a("number");
        expect(res.body.id).to.equal(1);
        expect(res.body).to.have.property("name");
        expect(res.body.name).to.be.a("string");
        expect(res.body.name).to.equal("Test User");
        expect(res.body).to.have.property("email");
        expect(res.body.email).to.be.a("string");
        expect(res.body.email).to.equal("test@email.com");
        expect(res.body).to.have.property("token");
        expect(res.body.token).to.be.a("string");
        expect(res.body.token).to.match(
          /(^[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*\.[A-Za-z0-9-_]*$)/
        );
      }));

  it("return 404 if email is invalid", () =>
    request("http://localhost:3000")
      .get("/login?email=bad-email")
      .then((res) => {
        expect(res.statusCode).to.equal(404);
      }));

  it("return 400 if email is missing", () =>
    request("http://localhost:3000")
      .get("/login")
      .then((res) => expect(res.statusCode).to.equal(400)));
});
