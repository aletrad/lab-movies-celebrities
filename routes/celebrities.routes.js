const router = require("express").Router();
const Celebrity = require("../models/Celebrity.model");

// all your routes here

router.get("/celebrities", (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      res.render("celebrities/celebrities", { celebrities });
    })
    .catch((err) => next(err));
});

router.get("/celebrities/create", (req, res, next) => {
  res.render("celebrities/new-celebrity");
});

router.post("/celebrities/create", (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

router.get("/celebrities/:id", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrities) => {
      res.render("celebrities/celebrity-details", celebrities);
    })
    .catch((err) => next(err));
});

router.get("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findById(id)
    .then((celebrities) => {
      res.render("celebrities/edit-celebrity", celebrities);
    })
    .catch((err) => next(err));
});

router.post("/celebrities/:id/edit", (req, res, next) => {
  const { id } = req.params;
  const { name, occupation, catchPhrase } = req.body;
  Celebrity.findByIdAndUpdate(id, { name, occupation, catchPhrase })
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

router.post("/celebrities/:id/delete", (req, res, next) => {
  const { id } = req.params;
  Celebrity.findByIdAndRemove(id)
    .then(() => res.redirect("/celebrities"))
    .catch((err) => next(err));
});

module.exports = router;
