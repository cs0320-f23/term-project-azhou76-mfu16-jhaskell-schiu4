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
      matches.push(i - j); //"Found pattern " + "at index " + (i - j) + "\n");
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

recordRoutes.get("/searchbook", async (req, res) => {
  let db = client.db(dbName);
  //   const {title, pat} = req.query;
  try {
    var records = await db
      .collection("books")
      .find({ title: "A CASE OF IDENTITY" }) // replace "Sample Book" with title
      .toArray();
    console.log("hi");
    if (records.length > 0) {
      console.log("hi2");
      let matches = {};
      console.log(records[0].numchapters);
      if (records[0].numchapters !== "overall") {
        for (let i = 0; i < parseInt(records[0].numchapters); i++) {
          console.log("books are slay");
          matches[i + 1] = KMPSearch(
            "side",
            records[0].text["chapter" + (i + 1).toString()]
          ); // change "text" to pat
        }
      } else {
        matches["overall"] = KMPSearch("side", records[0].text["overall"]); // change "text" to pat
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

recordRoutes.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
