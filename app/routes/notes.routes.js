const { authJwt } = require("../middlewares");
const controller = require("../controllers/notes.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notes/all", [authJwt.verifyToken], controller.allNotes);

  app.post("/api/notes/add", [authJwt.verifyToken], controller.addNewNote);

  app.put('/api/notes/edit/:id', [authJwt.verifyToken], controller.editNote);

  app.delete('/api/notes/delete/:id', [authJwt.verifyToken], controller.deleteNote)
};