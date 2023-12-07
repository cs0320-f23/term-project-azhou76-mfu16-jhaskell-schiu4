const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

recordRoutes.route("/books").get(async function (req, res) {
  let db_connect = dbo.getDb();
  const { title, author } = req.query;

  try {
    var records = await db_connect
      .collection("books")
      .findOne({ title: title, author: author });
    if (records) {
      return res.json(records.text);
    } else {
      res.status(401).json({ message: "Nonexistent book/author" });
    }
  } catch (e) {
    console.log("An error occurred pulling the book. " + e);
  }
});

recordRoutes.route("/books/genresearch").get(async function (req, res) {
  let db_connect = dbo.getDb();
  const genre = req.body();

  try {
    var records = await db_connect
      .collection("books")
      .find({ genre: { $in: [genre] } });
    if (records) {
      return res.json(records.text);
    } else {
      res.status(401).json({ message: "Nonexistent book/author" });
    }
  } catch (e) {
    console.log("An error occurred pulling the book. " + e);
  }
});
