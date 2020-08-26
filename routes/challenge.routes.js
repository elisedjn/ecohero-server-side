const express = require("express");
const router = express.Router();

const UserModel = require('../models/User.model')
const AchievementModel = require('../models/Achievement.model')
const ChallengeModel = require('../models/Challenge.model')

const { isLoggedIn } = require('../helpers/auth-helper');
const { route } = require("./auth.routes");


//Get all the challenges // FULL ROUTE -> /challenges
router.get("", (req, res) => {
  ChallengeModel.find()
    .then((challenges) => {
      res.status(200).json(challenges)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
      })
    })
})

//Get a specific challenge based on its id // FULL ROUTE -> /challenges/:challengeId
router.get('/:challengeId', (req, res) => {
  ChallengeModel.findById(req.params.challengeId)
    .then((challenge) => {
      res.status(200).json(challenge)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
       })
    })
})

// Create a new challenge // FULL ROUTE -> challenges/create
router.post('/create', isLoggedIn, (req, res) => {
  const {title, description, points} = req.body
  ChallengeModel.create({title, description, points})
    .then((challenge) => {
      res.status(200).json(challenge)
    })
})

module.exports = router;