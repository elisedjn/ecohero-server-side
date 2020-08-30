const express = require('express')
const router = express.Router()

let AchievementModel = require('../models/Achievement.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn
const UserModel = require('../models/User.model');
const { route } = require('./user.routes');



//Get all the completed achievements from all users // FULL ROUTE -> /achievements/allcompleted
router.get('/allcompleted', (req, res) => {
  AchievementModel.find({completed: true})
    .populate('challenge')
    .populate('user')
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
           error: 'Something went wrong',
           message: err
      })
    })
})

//Create an achievement // FULL ROUTE -> /achievements/create/:challengeID/:userID
router.post('/create/:challengeID/:userID', isLoggedIn, (req, res) => {
  let newAchievement = {
    challenge: req.params.challengeID, 
    user: req.params.userID,
  }
  AchievementModel.create(newAchievement)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(500).json({
           error: 'Something went wrong',
           message: err
      })
    })
})

// Shows a specific achievement // FULL ROUTE -> /achievements/:achievID
router.get('/:achievID', (req, res) => {
  AchievementModel.findById(req.params.achievID)
  .populate('challenge')
  .populate('user')
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(500).json({
         error: 'Something went wrong',
         message: err
    })
  })  
})


// Edits a specific achievement // FULL ROUTE -> /achievements/:achievID
router.patch("/:achievID", (req,res) => {
    let id = req.params.achievID
    const {completed, image, finishing_date} = req.body
    console.log("value received", req.body)

    AchievementModel.findByIdAndUpdate(id, {$set: {completed: completed, image: image, finishing_date}})
    .populate('challenge')
    .populate('user')
    .then((response) => {
       res.status(200).json(response)
    })
    .catch((err) => {
        res.status(500).json({
          error: 'Something went wrong',
          message: err
      })
    })  
})


// Deletes a specific achievement // FULL ROUTE -> /achievements/:achievID
router.delete('/:achievID', isLoggedIn, (req, res) => {
  AchievementModel.findByIdAndDelete(req.params.achievId)
        .then((response) => {
             res.status(200).json(response)
        })
        .catch((err) => {
             res.status(500).json({
                  error: 'Something went wrong',
                  message: err
             })
        })  
})


// Shows all the achievements of a specific user // FULL ROUTE -> /achievements/:userID
router.get("/user/:userID", (req, res) => {
  AchievementModel.find({user: req.params.userID})
  .populate("challenge")
  .then((response) => {
    res.status(200).json(response)
  })
  .catch((err) => {
    res.status(500).json({
         error: 'Something went wrong',
         message: err
    })
  })  
})




module.exports = router;