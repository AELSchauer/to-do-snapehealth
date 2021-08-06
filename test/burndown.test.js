const expect = require("expect.js");
const request = require("supertest");

describe("GET /burndown", () => {
  it("should return a list of dates with a count of tasks", () =>
    request("http://localhost:3000")
      .get("/burndown")
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.a("array");
        res.body.forEach((obj) => {
          expect(obj).to.be.a("object");
          expect(obj).to.have.property("date");
          expect(obj.date).to.be.a("string");
          expect(obj.date).to.match(/^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}:\d{2}$/);
          expect(obj).to.have.property("count");
          expect(obj.count).to.be.a("number");
          expect(obj.count).to.be.above(0);
        });
      }));
});
