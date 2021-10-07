const validUser = require("./ModelSchema");

const express = require("express");
const bcrypt = require("bcrypt");
const { Register, Login } = require("./validationFile");

const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { error } = await Register(req.body);

    if (error) {
      return res.status(401).json(error.details[0].message);
    }

    const EmailChecker = await validUser.findOne({ email: req.body.email });

    if (EmailChecker) {
      return res.status(401).json("Email Already exists");
    }

    hider = await bcrypt.genSalt(10);

    passwordHider = await bcrypt.hash(req.body.password, hider);

    const newUser = await validUser.create({
      userName: req.body.userName,
      email: req.body.email,
      password: passwordHider,
    });

    res.status(200).json(newUser);
  } catch (error) {
    res.status(404).json("an error occured");
  }
});

router.post("/login", async (req, res) => {
  try {
    const { error } = await Login(req.body);

    if (error) {
      return res.status(401).json(error.details[0].message);
    }

    const EmailChecker = await validUser.findOne({ email: req.body.email });

    if (!EmailChecker) {
      return res.status(401).json("invalid email");
    }

    const passwordCheck = await bcrypt.compare(
      req.body.password,
      EmailChecker.password
    );

    if (!passwordCheck) {
      return res.status(401).json("incorect password");
    }

    const token = jwt.sign({ _id: validUser._id },
      process.env.TOKEN_SECRET
    );

    res.header("auth-token").send(token);
  } catch (error) {
    res.status(404).json("an error occured");
  }
});

module.exports = router;
