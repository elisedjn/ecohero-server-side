const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");

const { isLoggedIn } = require("../helpers/auth-helper"); // to check if user is loggedIn
const { array } = require("../config/cloudinary.config");

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
      errorMessage: "The email format is not correct",
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
          user.passwordHash = "***";
          req.session.loggedInUser = user;
          res.status(200).json(user);
        })
        .catch((err) => {
          console.log(err)
          if (err.code === 11000 && Object.keys(err.keyPattern).includes('username')) {
            res.status(500).json({
              errorMessage: "This username is already in use! Please choose another one",
            });
            return;
          } else if (err.code === 11000 && Object.keys(err.keyPattern).includes('email')){
            res.status(500).json({
              errorMessage: "This email is already in use! Please choose another one or login",
            });
            return;
          }
          else {
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
      errorMessage: "Please enter email and password",
    });
    return;
  }
  const myRegex = new RegExp(
    /^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/
  );
  if (!myRegex.test(email)) {
    res.status(500).json({
      errorMessage: "Email format is not correct",
    });
    return;
  }

  UserModel.findOne({ email })
    .then((userData) => {
      bcrypt.compare(password, userData.passwordHash)
        .then((doesItMatch) => {
          if (doesItMatch) {
            userData.passwordHash = "***";
            req.session.loggedInUser = userData;
            res.status(200).json(userData);
          } else {
            res.status(500).json({
              errorMessage: "Passwords don't match. Please try again",
            });
            return;
          }
        })
        .catch(() => {
          res.status(500).json({
            errorMessage: "Email format is not correct",
          });
          return;
        });
    })
    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        errorMessage: 'This user does not exist. Please Sign Up first.'
      })
      return;
    });
});

router.post('/logout', isLoggedIn,   (req, res) => {
  req.session.destroy();
  res
  .status(204) //  No Content
  .send();
})

router.get("/user", isLoggedIn, (req, res, next) => {
res.status(200).json(req.session.loggedInUser);
});

module.exports = router;
