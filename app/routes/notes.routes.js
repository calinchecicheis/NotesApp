const { authJwt } = require("../middlewares");
const controller = require("../controllers/notes.controller");
const { 
  getAllNotes, 
  filterByCreatedOrUpdatedDate, 
  filterByTitle, 
  filterByStatus, 
  addNewNote, 
  editNote, 
  deleteNote 
} = require('../controllers/notes.controller');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/notes/all", [authJwt.verifyToken], getAllNotes);

  app.get('/api/notes/filter-by-created-date', [authJwt.verifyToken], filterByCreatedOrUpdatedDate);

  app.get('/api/notes/filter-by-title', [authJwt.verifyToken], filterByTitle);

  app.get('/api/notes/filter-by-status', [authJwt.verifyToken], filterByStatus);

  app.post("/api/notes/add", [authJwt.verifyToken], addNewNote);

  app.put('/api/notes/edit/:id', [authJwt.verifyToken], editNote);

  app.delete('/api/notes/delete/:id', [authJwt.verifyToken], deleteNote)
};