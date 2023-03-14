const express = require("express");
const mongoose = require("mongoose");

const Comment = require("./model");

var app = express();

//  This will create a db called mern-demo when you post a comment
const db = "mongodb://127.0.0.1:27017/mern-demo";

// DB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

//  Server Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//  Cors -- WhiteList all NOT FOR PRODUCTION
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Orgin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//  ---Routes

//  Get Comments
app.get("/get-text", (req, res, next) => {
  Comment.find()
    .then((comments) => {
      res.json(comments);
    })
    .catch((err) => next(err));
});

//  Add Comment
app.post("/post-text", (req, res, next) => {
  console.log(req.body);
  Comment.create(req.body)
    .then((comment) => {
      res.json(comment);
    })
    .catch((err) => next(err));
});

//  If in local dev, set port to 8080
const PORT = process.env.PORT || 8080;

//  Connect to DB
connectDB();

//  Start server
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
