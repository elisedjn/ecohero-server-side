const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

let UserModel = require("../models/User.model");
const { isLoggedIn } = require("../helpers/auth-helper"); // to check if user is loggedIn
const AchievementModel = require("../models/Achievement.model");

// Shows the users with the highest amount of points // FULL ROUTE -> /users/leaderboard
router.get("/leaderboard", (req, res) => {
  UserModel.find({ points: { $gt: 0 } })
    .sort({ points: -1 })
    .limit(100)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Shows the details of a specific user // FULL ROUTE -> /users/:id
router.get("/:id", (req, res) => {
  UserModel.findById(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Edits the infos of a specific user // FULL ROUTE -> /users/:id/edit
router.patch("/:id/edit", isLoggedIn, (req, res) => {
  let id = req.params.id;
  console.log(req.body);
  const { username, image, email, password, points, rank } = req.body;

  if (!username || !email) {
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

  if (password) {
    const myPassRegex = new RegExp(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/
    );
    if (!myPassRegex.test(password)) {
      res.status(500).json({
        errorMessage:
          "Password needs to have at least 8 characters, a number and an Uppercase alphabet",
      });
      return;
    }
    bcrypt.genSalt(12).then((salt) => {
      bcrypt.hash(password, salt).then((passwordHash) => {
        UserModel.findByIdAndUpdate(id, {
          $set: { username: username, image: image, email: email, passwordHash: passwordHash },
        })
          .then((user) => {
            user.passwordHash = "***";
            res.status(200).json(user);
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              error: "Something went wrong",
              errorMessage: err,
            });
          });
      });
    });
  } else {
    let updatedObject = {}
    !points ? updatedObject = { username: username, image: image, email: email} : updatedObject = { username: username, image: image, email: email, points: points, rank:rank }
    UserModel.findByIdAndUpdate(id, {
      $set: updatedObject,
    })
      .then((user) => {
        user.passwordHash = "***";
        res.status(200).json(user);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          error: "Something went wrong",
          errorMessage: err,
        });
      });
  }

  
});

// Shows all the achievements (completed or not) of a specific user // FULL ROUTE -> /users/:id/achievements
router.get("/:id/achievements", isLoggedIn, (req, res) => {
  AchievementModel.find({ user: req.params.id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// Deletes a user from the data base // FULL ROUTE -> /users/:id
router.delete('/:id', isLoggedIn, (req, res) => {
  UserModel.findByIdAndDelete(req.params.id)
    .then((result) => {
      AchievementModel.deleteMany({user: req.params.id})
        .then((response) => {
             res.status(200).json(response)
        })      
    })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})

module.exports = router;
