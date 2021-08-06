const { loremIpsum } = require("lorem-ipsum");
const expect = require("expect.js");
const request = require("supertest");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJuYW1lIjoiVGVzdCBVc2VyIiwiZW1haWwiOiJ0ZXN0QGVtYWlsLmNvbSIsImlhdCI6MTYyODIxMjE0Nn0.FqCkz4Glij3VH1q4f-BlQ0mrUlJm8rdrFjm9KKd5NKk";

describe("GET /tasks", () => {
  it("should return a list of tasks for the authorized user", () =>
    request("http://localhost:3000")
      .get("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).to.equal(200);
        res.body.forEach((task) => {
          expect(task).to.be.an("object");
          expect(task).to.have.property("id");
          expect(task.id).to.be.a("number");
          expect(task).to.have.property("title");
          expect(task.title).to.be.a("string");
          expect(task).to.have.property("user_id");
          expect(task.user_id).to.be.a("number");
          expect(task).to.have.property("user_name");
          expect(task.user_name).to.be.a("string");
          expect(task).to.have.property("is_complete");
          expect(task.is_complete).to.be.a("boolean");
          expect(task).to.have.property("created_at");
          expect(task.created_at).to.be.a("string");
          expect(task.created_at).to.not.equal(null);
          expect(task).to.have.property("updated_at");
          expect(task).to.have.property("completed_at");
        });
      }));

  it("should return a 401 error if token is missing", () =>
    request("http://localhost:3000")
      .get("/tasks")
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));

  it("should return a 401 error if token is invalid", () =>
    request("http://localhost:3000")
      .get("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer badtoken`)
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));
});

describe("POST /tasks", () => {
  it("should create a new ask if body is valid", () =>
    request("http://localhost:3000")
      .post("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: loremIpsum({
          count: 5,
          format: "plain",
          units: "words",
        }),
        is_complete: true,
      })
      .then((res) => {
        expect(res.statusCode).to.equal(201);
        expect(res.body).to.be.an("object");
        expect(res.body).to.have.property("id");
        expect(res.body.id).to.be.a("number");
        expect(res.body).to.have.property("title");
        expect(res.body.title).to.be.a("string");
        expect(res.body).to.have.property("user_id");
        expect(res.body.user_id).to.be.a("number");
        expect(res.body).to.have.property("is_complete");
        expect(res.body.is_complete).to.be.a("boolean");
        expect(res.body).to.have.property("created_at");
        expect(res.body.created_at).to.be.a("string");
        expect(res.body.created_at).to.not.equal(null);
        expect(res.body).to.have.property("updated_at");
        expect(res.body.updated_at).to.equal(null);
        expect(res.body).to.have.property("completed_at");
        expect(res.body.completed_at).to.be.a("string");
        expect(res.body.completed_at).to.not.equal(null);
      }));

  it("should return a 401 error if body is missing", () =>
    request("http://localhost:3000")
      .post("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).to.equal(400);
      }));

  it("should return a 401 error if token is missing", () =>
    request("http://localhost:3000")
      .post("/tasks")
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));

  it("should return a 401 error if token is invalid", () =>
    request("http://localhost:3000")
      .post("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer badtoken`)
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));
});

describe("DELETE /tasks", () => {
  it("should delete a task", () =>
    request("http://localhost:3000")
      .post("/tasks")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .send({
        title: loremIpsum({
          count: 5,
          format: "plain",
          units: "words",
        }),
      })
      .then(({ body: { id } }) =>
        Promise.all([
          id,
          request("http://localhost:3000")
            .delete(`/tasks/${id}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
              title: loremIpsum({
                count: 5,
                format: "plain",
                units: "words",
              }),
            }),
        ])
      )
      .then(([id, res]) => {
        expect(res.statusCode).to.equal(204);
        return request("http://localhost:3000")
          .get(`/tasks/${id}`)
          .set("Accept", "application/json")
          .set("Authorization", `Bearer ${token}`);
      })
      .then((res) => {
        expect(res.statusCode).to.equal(404);
      }));

  it("should return a 204 if task doesn't exist", () =>
    request("http://localhost:3000")
      .delete("/tasks/1000")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${token}`)
      .then((res) => {
        expect(res.statusCode).to.equal(204);
      }));

  it("should return a 401 error if token is missing", () =>
    request("http://localhost:3000")
      .delete("/tasks/1")
      .set("Accept", "application/json")
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));

  it("should return a 401 error if token is invalid", () =>
    request("http://localhost:3000")
      .delete("/tasks/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer badtoken`)
      .then((res) => {
        expect(res.statusCode).to.equal(401);
      }));
});
