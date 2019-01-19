// server
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.listen(PORT, function() {
  console.log("Server listening on http://localhost:" + PORT);
});

// database
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/browserbud";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// logger
const logger = require("morgan");
app.use(logger("dev"));

// routes
const routes = require("./controllers/routes");
app.use(routes);