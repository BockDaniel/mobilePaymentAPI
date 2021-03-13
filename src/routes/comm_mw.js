// get the required modules
const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/users.controller');

// creating the routes
router.get('/test', (req, res, next) => {
    res.send("This is the test route in the communications router file")
})

router.post('/addNew', userCtrl.addUser); // creating a new user
router.get("/fetchUsers", userCtrl.fetchAllUsers); // fetching all users registered in the system
router.get("/fetchUser/:uid", userCtrl.fetchUser);   // fetching a particular user from the datasource
router.post("/changeUser", userCtrl.changeUser);    // updating a users info

module.exports = router;