const express = require("express");
const router = express.Router();

let GroupModel = require("../models/Group.model");
let AchievementModel = require('../models/Achievement.model')
const { isLoggedIn } = require("../helpers/auth-helper"); // to check if user is loggedIn
const { route } = require("./auth.routes");


//Get all groups available // FULL ROUTE -> /groups
router.get('', isLoggedIn, (req, res) => {
  GroupModel.find()
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


//Create a group // FULL ROUTE -> /groups/create
router.post('/create', isLoggedIn, (req, res) => {
  const {name, description, location, date, user, challenge} = req.body
  let members = [user]
  GroupModel.create({name, description, location, date, members, challenge})
    .then((group) => {
      res.status(200).json(group)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).json({
        error: 'Something went wrong',
        message: err
       })
    })
})


//Get a specific group based on it's id // FULL ROUTE -> /groups/:groupID
router.get('/:groupID', isLoggedIn, (req, res) => {
  GroupModel.findById(req.params.groupID)
    .populate('members')
    .populate('challenge')
    .then((group) => {
      res.status(200).json(group)
    })
    .catch((err) => {
      res.status(500).json({
        error: 'Something went wrong',
        message: err
       })
    })
})

// Update a group (add a member) // FULL ROUTE -> /groups/:groupID
router.patch('/:groupID', isLoggedIn, (req, res) => {
  const {membersList} = req.body
  GroupModel.findByIdAndUpdate(req.params.groupID, {$set: {members: membersList}})
  .then((group) => {
    res.status(200).json(group)
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Something went wrong',
      message: err
     })
  })
})

//Valid the group event // FULL ROUTE -> /groups/valid/:groupID
router.patch('/valid/:groupID', isLoggedIn, (req, res) => {
  const {image, finished} = req.body
  GroupModel.findByIdAndUpdate(req.params.groupID, {$set: {image: image, finished:finished}})
  .populate('challenge')
  .populate('members')
  .then((group) => {
    res.status(200).json(group)
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Something went wrong',
      message: err
     })
  })
})


// Get all the events of a specific user // FULL ROUTE -> /groups/user/:userID
router.get('/user/:userID',isLoggedIn, (req, res) => {
  GroupModel.find({members: req.params.userID})
  .populate('members')
  .populate('challenge')
  .then((groups) => {
    console.log(groups)
    res.status(200).json(groups)
  })
  .catch((err) => {
    res.status(500).json({
      error: 'Something went wrong',
      message: err
     })
  })
})


module.exports = router;

