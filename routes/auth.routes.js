const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");

const { isLoggedIn } = require("../helpers/auth-helper"); // to check if user is loggedIn

router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  //Server side verification
  if (!username || !email || !password) {
    res.status(500).json({
      errorMessage: "Please enter username, email and password",
    });
    return;
  }

  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      errorMessage: "Email format not correct",
    });
    return;
  }

  const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/);
  if (!myPassRegex.test(password)) {
    res.status(500).json({
      errorMessage:
        "Password needs to have at least 8 characters, a number and an Uppercase alphabet",
    });
    return;
  }

  bcrypt.genSalt(12).then((salt) => {
    bcrypt.hash(password, salt).then((passwordHash) => {
      UserModel.create({ email, username, passwordHash })
        .then((user) => {
          req.session.loggedInUser = user;
          res.status(200).json(user);
        })
        .catch((err) => {
          if (err.code === 11000) {
            res.status(500).json({
              errorMessage: "username or email entered already exists!",
            });
            return;
          } else {
            console.log(err)
            res.status(500).json({
              errorMessage: "Something went wrong! Please try again.",
            });
            return;
          }
        });
    });
  });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(500).json({
      error: "Please enter email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      error: "Email format is not correct",
    });
    return;
  }

  UserModel.findOne({ email })
    .then((userData) => {
      bcrypt.compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          if (doesItMatch) {
            req.session.loggedInUser = userData;
            res.status(200).json(userData);
          } else {
            res.status(500).json({
              error: "Passwords don't match",
            });
            return;
          }
        })
        .catch(() => {
          res.status(500).json({
            error: "Email format is not correct",
          });
          return;
        });
    })
    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        error: 'This user does not exist'
      })
      return;
    });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res
  .status(204) //  No Content
  .send();
})

router.get("/profile", isLoggedIn, (req, res, next) => {
res.status(200).json(req.session.loggedInUser);
});

module.exports = router;
