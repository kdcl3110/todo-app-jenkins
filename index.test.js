const request = require("supertest");
const app = require("./app.js");

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

// describe("POST /auth/anonyme", () => {
//   test("Connexion visiteur", (done) => {
//     request(app)
//       .get("/auth/anonyme")
//       .expect(200)
//       .end((err, res) => {
//         if (err) return done(err);
//         expect(res.status).toEqual(200);
//         done();
//       });
//   });
// });
