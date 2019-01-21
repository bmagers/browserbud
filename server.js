// server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// database
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/browserbud";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
const db = require("./models");

// logger
const logger = require("morgan");
app.use(logger("dev"));

// authentication
const passport = require("passport");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(userId, done) {
  db.User.findById(userId, (err, user) => done(err, user));
});

const LocalStrategy = require("passport-local").Strategy;
const local = new LocalStrategy((username, password, done) => {
  db.User.findOne({ username })
  .then(user => {
    if (!user || !user.validPassword(password)) {
      done(null, false, { message: "Invalid username/password." });
    } else {
      done(null, user);
    }
  })
  .catch(error => done(error));
});
passport.use("local", local);

// routes
const routes = require("./controllers/routes");
app.use(routes)(passport);

app.listen(PORT, function() {
  console.log("Server listening on http://localhost:" + PORT);
});