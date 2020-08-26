const express = require('express')
const router = express.Router()

let UserModel = require('../models/User.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn

router.get("/users/leaderboard", isLoggedIn, (req, res) => {
  UserModel.find({points: req.params})
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

router.patch("/users/:id/edit", isLoggedIn, (req, res) => {

  
})