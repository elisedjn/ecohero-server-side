const express = require("express");
const router = express.Router();

let GroupModel = require("../models/Group.model");
const { isLoggedIn } = require("../helpers/auth-helper"); // to check if user is loggedIn


//Get all groups available // FULL ROUTE -> /groups
router.get('/groups', isLoggedIn, (req, res) => {
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
  const {name, description, location, date} = req.body
  GroupModel.create({name, description, location, date})
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
router.get('/:groupID', (req, res) => {
  GroupModel.findById(req.params.groupID)
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




module.exports = router;

