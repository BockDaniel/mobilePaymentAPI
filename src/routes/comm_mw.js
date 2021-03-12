// get the required modules
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users.controller');

// creating the routes
router.get('/test', (req, res, next) => {
    res.send("This is the test route in the communications router file")
})

router.post('/addNew', userCtrl.addUser); // creating a new user

module.exports = router;