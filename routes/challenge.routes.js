const express = require("express");
const router = express.Router();

const UserModel = require('../models/User.model')
const AchievementModel = require('../models/Achievement.model')
const ChallengeModel = require('../models/Challenge.model')

const { isLoggedIn } = require('../helpers/auth-helper');



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

//Get a specific challenge based on its id // FULL ROUTE -> /challenges/:challengeID
router.get('/:challengeID', (req, res) => {
  ChallengeModel.findById(req.params.challengeID)
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

// Create a new challenge // FULL ROUTE -> /challenges/create
router.post('/create', isLoggedIn, (req, res) => {
  const {title, description, points, fact} = req.body
  console.log(req.body)
  ChallengeModel.create({title, description, points, fact})
    .then((challenge) => {
      res.status(200).json(challenge)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: 'Something went wrong',
        message: err
       })
    })
})

module.exports = router;