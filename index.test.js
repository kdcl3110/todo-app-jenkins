const request = require("supertest");
const app = require("./app.js");

// ce test permet de tester l'ajout d'une tache dans le todolist
describe("POST /test_ajout", () => {
  test("Ajout d'une tache", (done) => {
    request(app)
      .post("/test_ajout")
      .send({
        newItem: "Create_todo",
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body[res.body?.length - 1]).toEqual("Create_todo");
        done();
      });
  });
});