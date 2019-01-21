const express = require("express");
const router = express.Router();
const db = require("../models");
const passport = require("passport");

router.get("/test/:user", function(req, res) {
  db.User.find({
    local: {
      email: req.params.user
    }
  }).populate("pages")
  .populate("columns")
  .populate("panels")
  .populate("links")
  .then(function(dbResult) {
    res.json(dbResult);
  }).catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addPage", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Page.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.get("/addColumn", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Column.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addPanel", function(req, res) {
  var data = {
    stackOrder: 1
  };
  db.Panel.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

router.post("/addLink/:url/:name", function(req, res) {
  var data = {
    stackOrder: 1,
    websiteUrl: req.params.url,
    websiteName: req.params.name 
  };
  db.Link.create(data)
  .then(function(dbResult) {
    console.log(dbResult);
  })
  .catch(function(err) {
    console.log(err.message);
  });
});

// login
router.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
  failureFlash: true
}));

//register
router.post("/register", (req, res, next) => {
  console.log("posted in route");
  const { username, password } = req.body;
  db.User.create({ username, password })
  .then(user => {
    req.login(user, error => {
      if (error) next(error);
      else res.redirect("/");
    });
  })
  .catch(error => {
    if (error.name === "ValidationError") {
      req.flash("Sorry, that username is already taken.");
      res.redirect("/register");
    } else next(error);
  });
});

// logout
router.all("/logout", function(req, res) {
  req.logout();
  res.redirect("/login");
});

module.exports = router;