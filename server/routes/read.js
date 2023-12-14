const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express(); //.Router();
const port = 8000;
const bodyParser = require("body-parser");
recordRoutes.use(bodyParser.json()); // for parsing application/json
recordRoutes.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Enable CORS
recordRoutes.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// This will help us connect to the database
const MongoClient = require("mongodb").MongoClient;

const url = "mongodb+srv://user1:brownucs32@cluster0.vdpc4cf.mongodb.net/";
const dbName = "ebook";

const client = new MongoClient(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

recordRoutes.get("/getbook", async (req, res) => {
  let db = client.db(dbName);
  const { bookId, chapter } = req.query;
  try {
    var records = await db
      .collection("books")
      .find({ bookID: bookId }) // replace "0" with bookId
      .toArray();
    if (records.length > 0) {
      // get all high level keys/values, but only get chapter1 from comments and text fields
      const { comments, text, ...rest } = records[0];
      if (!comments[chapter] || !text[chapter]) {
        return res.status(401).json({ message: "Chapter not found" });
      }

      return res.json({
        ...rest,
        comments: comments[chapter],
        text: text[chapter],
      }); // replace chapter1 with chapter
      // return res.json([records[0].text.chapter, records[0].comments.chapter]); // replace chapter1 with chapter
    } else {
      res.status(401).json({ message: "Nonexistent book/author" });
    }
  } catch (e) {
    console.log("An error occurred pulling the book. " + e);
  }
});

//Javascript program for implementation of KMP pattern
// searching algorithm

function computeLPSArray(pat, M, lps) {
  // length of the previous longest prefix suffix
  var len = 0;
  var i = 1;
  lps[0] = 0; // lps[0] is always 0

  // the loop calculates lps[i] for i = 1 to M-1
  while (i < M) {
    if (pat.charAt(i) == pat.charAt(len)) {
      len++;
      lps[i] = len;
      i++;
    } // (pat[i] != pat[len])
    else {
      // This is tricky. Consider the example.
      // AAACAAAA and i = 7. The idea is similar
      // to search step.
      if (len != 0) {
        len = lps[len - 1];

        // Also, note that we do not increment
        // i here
      } // if (len == 0)
      else {
        lps[i] = len;
        i++;
      }
    }
  }
}

function KMPSearch(pat, txt) {
  var M = pat.length;
  var N = txt.length;

  // create lps[] that will hold the longest
  // prefix suffix values for pattern
  var lps = [];
  var j = 0; // index for pat[]

  // Preprocess the pattern (calculate lps[]
  // array)
  computeLPSArray(pat, M, lps);

  var i = 0; // index for txt[]
  var matches = [];
  while (N - i >= M - j) {
    if (pat.charAt(j) == txt.charAt(i)) {
      j++;
      i++;
    }
    if (j == M) {
      matches.push([
        i - j,
        txt.substring(i - j, Math.min(txt.length, i - j + pat.length + 20)),
      ]); //"Found pattern " + "at index " + (i - j) + "\n");
      j = lps[j - 1];
    }

    // mismatch after j matches
    else if (i < N && pat.charAt(j) != txt.charAt(i)) {
      // Do not match lps[0..lps[j-1]] characters,
      // they will match anyway
      if (j != 0) j = lps[j - 1];
      else i = i + 1;
    }
  }
  return matches;
}

// var txt = "ABABDABACDABABCABAB";
// var pat = "ABABCABAB";
// KMPSearch(pat, txt);

// comments field, each chapter maps to a list of maps that have start, end indices, "content" comment fields

// array of arrays, each sub array has chapter number and then text
recordRoutes.get("/searchbook", async (req, res) => {
  let db = client.db(dbName);
  //   const {bookId, pat} = req.query;
  try {
    var records = await db
      .collection("books")
      .find({ bookID: "2" }) // replace "2" with bookId
      .toArray();
    console.log("hi");
    if (records.length > 0) {
      console.log("hi2");
      let matches = {};
      console.log(records[0].numChapters);
      for (let i = 0; i < parseInt(records[0].numChapters); i++) {
        console.log("books are slay");
        matches[i + 1] = KMPSearch(
          "seldom",
          records[0].text["chapter" + (i + 1).toString()]
        ); // change "text" to pat
      }

      //   console.log(matches);
      return res.json(matches);
    } else {
      res.status(401).json({ message: "Nonexistent book/author" });
    }
  } catch (e) {
    console.log("An error occurred pulling the book. " + e);
  }
});

// TO TEST, in another terminal run: curl -X PUT http://localhost:8000/addcomment
recordRoutes.put("/addcomment", async (req, res) => {
  //   const { id } = req.params; //IGNORE
  //   const newData = req.body; //IGNORE
  let db = client.db(dbName);
  const { bookId, chapter, startIndex, endIndex, comment } = req.query; // uncomment when integrating
  // const bookId = "2";
  // const chapter = "chapter2";
  // const startIndex = "20";
  // const endIndex = "50";
  // const comment = "This is the added comment";
  // console.log(req.query);

  try {
    const collection = db.collection("books");
    const updateKey = "comments." + chapter;
    const result = await collection.updateOne(
      { bookID: bookId },
      {
        $push: {
          [updateKey]: {
            startIndex: parseInt(startIndex),
            endIndex: parseInt(endIndex),
            content: comment,
          },
        },
      }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Document not found" });
    }

    return res.json({ message: "Document updated successfully" });
  } catch (error) {
    console.error("Error updating document:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

recordRoutes.put("/api/addbook", async (req, res) => {
  const bookData = req.body;
  // console.log(bookData);

  try {
    await client.connect();
    console.log("Connected correctly to server");

    const db = client.db(dbName);
    const col = db.collection("books");

    // Insert a single document
    const result = await col.updateOne(
      { bookID: bookData.bookID },
      { $set: bookData },
      { upsert: true }
    );

    res.status(200).send({ message: "Book updated", result: result });
  } catch (err) {
    console.log(err.stack);
    res
      .status(500)
      .send({ message: "Error connecting to the database", error: err });
  }

  // Close the connection
  client.close();
});

/*
id={book.id}
key={book.id}
author={book.author}
imgPath={book.imgPath}
title={book.title}
genres={book.genres}
*/
// gets metadata of all current books
recordRoutes.get("/api/getbooks", async (req, res) => {
  let db = client.db(dbName);

  try {
    var records = await db
      .collection("books")
      .find({}, { projection: { text: 0, comments: 0 } })
      .toArray();
    res.status(200).json({
      status: "success",
      data: records,
    });
  } catch (err) {
    console.error("Error occurred while getting books:", err);
    res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
});

recordRoutes.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
