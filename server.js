require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const url = "mongodb://localhost/UserValidationDB";
const 
DATABASE_URL ="mongodb+srv://shotkode:shotkode@cluster0.2kfdg.mongodb.net/chestDB?retryWrites=true&w=majority"
const port = 8000;

const app = express();
app.use(express.json());

mongoose.connect(DATABASE_URL, { useNewUrlParser: true }).then(() => {
  console.log("connected successfully");
});

app.use("/api/user", require("./Router"));
app.use("/api/home", require("./LandingPage"));

app.listen(port, () => {
  console.log(`listening on port${port}`);
});
