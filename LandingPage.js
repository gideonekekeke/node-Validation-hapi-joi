const express = require("express");

const router = express.Router();
const private = require("./PrivaRoute");

router.get("/", private, (req, res) => {
  res.send("welcome to the homepage");
});

module.exports = router;
