const express = require('express')
const router = express.Router()

let AchievementModel = require('../models/Achievement.model')
const { isLoggedIn } = require('../helpers/auth-helper'); // to check if user is loggedIn





// Shows a specific achievement // FULL ROUTE -> /achievemenets/:achievID
router.get('/:achievID', isLoggedIn, (req, res) => {
  AchievementModel.findById(req.params.achievId)
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
router.patch("/:achievID", isLoggedIn, (req,res) => {
    let id = req.params.achievId
    const {completed, image, finishing_date} = req.body

    AchievementModel.findByIdAndUpdate(id, {$set: {completed: completed, image: image, finishing_date}})
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



// Deletes a specific achievement // FULL ROUTE -> /achievemenets/:achievID
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







module.exports = router;