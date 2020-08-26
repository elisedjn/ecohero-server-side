const express = require('express')
const router = express.Router()

let UserModel = require('../models/User.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn



// Shows the users with the highest amount of points //
router.get("/users/leaderboard", isLoggedIn, (req, res) => {
  UserModel.find().sort({points: -1}).limit(100)
    .then((result) => {
        res.status(200).json(result)
    })
    .catch((err) => {
        res.status(500).json({
           error: 'Something went wrong',
           message: err
      })
    })
})


// Shows the details of a specific user //
router.get("/users/:id", isLoggedIn, (req,res) => {
    UserModel.findById(req.params.id)
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


// HASH the password!!!!!!!

// Edits the infos of a specific user //
router.patch("/users/:id/edit", isLoggedIn, (req, res) => {
      let id = req.params.id
      const {name, image, email, password} = req.params
      UserModel.findByIdAndUpdate(id, {$set: {name: name, image: image, email: email, password: password}})
      .then((response) => {
           res.status(200).json(response)
      })
      .catch((err) => {
           console.log(err)
           res.status(500).json({
                error: 'Something went wrong',
                message: err
           })
      }) 
})


// Shows all the achievements (completed or not) of a specific user //
router.get("users/:id/achievements", isLoggedIn, (req,res) => {
    UserModel.findById(req.params.id)
    .then((result) => {
      res.status(200).json(result.achievements)
     })
    .catch((err) => {
      res.status(500).json({
         error: 'Something went wrong',
         message: err
    })
  })

})