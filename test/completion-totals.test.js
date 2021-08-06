const expect = require("expect.js");
const request = require("supertest");

describe("GET /completion-totals", () => {
  it("should return a count of complete and incomplete tasks", () =>
    request("http://localhost:3000")
      .get("/completion-totals")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("complete");
        expect(res.body.complete).to.be.a("number");
        expect(res.body).to.have.property("incomplete");
        expect(res.body.incomplete).to.be.a("number");
      }));
});
