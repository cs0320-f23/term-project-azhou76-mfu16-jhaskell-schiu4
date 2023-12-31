import bcrypt from "bcrypt";

const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
const port = 8000;

// This will help us connect to the database
const dbo = require("../db/conn");

recordRoutes.route("/signUp").get(async function (req, res) {
  let db_connect = dbo.getDb();
  const { email, password } = req.body();

  try {
    var records = await db_connect
      .collection("users")
      .findOne({ email: email });
    if (records) {
      return res
        .status(409)
        .json({ error: "The entered Email already exists!" });
    } else {
      await db_connect
        .collection("users")
        .insertOne({ email: email, password: password });

      res.status(201).json({ message: "User has been created successfully!" });
    }
  } catch (e) {
    console.log("An error occurred pulling the user. " + e);
  }
});

recordRoutes.route("/signIn").get(async function (req, res) {
  let db_connect = dbo.getDb();
  const { email, password } = req.body();

  try {
    var records = await db_connect
      .collection("users")
      .findOne({ email: email });
    if (!records) {
      return res.status(401).json({ message: "Email incorrect" });
    } else {
      try {
        const passwordCorrect = await bcrypt.compare(
          password,
          records.password
        );

        if (!passwordCorrect) {
          return res
            .status(401)
            .json({ message: "Username or Password Incorrect" });
        }

        res.status(200).json({ message: "Successfully logged in" });
      } catch (error) {
        console.error("Error comparing passwords:", error);
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  } catch (e) {
    console.log("An error occurred pulling the user. " + e);
  }
});

recordRoutes.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
