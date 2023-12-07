const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express(); //.Router();
const port = 8000;

// This will help us connect to the database
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://user1:brownucs32@cluster0.vdpc4cf.mongodb.net/";
const dbName = "ebook";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// recordRoutes.get("/books", async (req, res) => {
//   let db = client.db(dbName);
//   const { title, author } = req.query;

//   try {
//     var records = await db
//       .collection("books")
//       .findOne({ title: title, author: author });
//     if (records) {
//       return res.json(records.text);
//     } else {
//       res.status(401).json({ message: "Nonexistent book/author" });
//     }
//   } catch (e) {
//     console.log("An error occurred pulling the book. " + e);
//   }
// });

recordRoutes.get("/getbook", async (req, res) => {
  let db = client.db(dbName);
  //   const {title, chapter} = req.query;
  try {
    var records = await db
      .collection("books")
      .find({ title: "Sample Book" }) // replace "Sample Book" with title
      .toArray();
    if (records.length > 0) {
      return res.json(records[0].text.chapter1); // replace chapter1 with chapter
    } else {
      res.status(401).json({ message: "Nonexistent book/author" });
    }
  } catch (e) {
    console.log("An error occurred pulling the book. " + e);
  }
});

recordRoutes.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
