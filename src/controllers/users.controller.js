// get the required modiles
const usersModel = require('../models/users.model');
const HttpException = require('../utils/HttpErrror.utils');

class UsersCtrl{

    // adding a new user to the system
    addUser = async (req, res, next) => {
        // extract the values from the request body
        try {
            const fname = req.body.fullName;
            const contact = req.body.contact;
            const password = req.body.password;

            if(password === ""){
                throw new HttpException(401, 'password field cannot be empty', 6);
            }

            // crate the prepared values
            const values = [fname, contact, password];

            // call the set user function from the user model
            const results = await usersModel.setUser(values);

            res.send(results + "user/s successfully added")
            next();
            
        } catch (e) {
            e.status = 401;
            next(e);
        }
        
    }

    // fetching all the users 
    fetchAllUsers = async (req, res, next) => {
        try {
            // call the getAll users function form the users module
            var allUsers = await usersModel.getAllUsers();

            if(!allUsers){
                throw new HttpException(401, 'the query could not be resolved. Please try again in a little bit');
            }

            // send the result as json
            res.json(allUsers);
            next();

        } catch (error) {
            error.status = 401;
            next(error);
        }
    }

    // fetching a particular user 
    fetchUser = async (req, res, next) => {
        try {
            // extract the parameter from the request
            const userId = req.params.uid;

            if(!userId){
                throw new HttpException(401, "please submit the request with a valid userID")
            }
            
            // call the getUser function form the users model
            const userData = await usersModel.getUser(userId);

            if(userData.length == 0){
                throw new HttpException(401, "no user match that userID. Please make sure to submit a valid userID")
            }
            res.json(userData);
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }

    // updating a user information
    changeUser = async (req, res, next) => {
        try {
            // extract the parameters from the request
            const fullName = req.body.fullName;
            const contact = req.body.contact;
            const userId = req.body.userId;

            if(!userId){
                throw new HttpException(401, "please submit the request with a valid userID")
            }

            const values = [fullName, contact, userId];
            const result = usersModel.updateUser(values);
            res.send(result);
            next();
        } catch (e) {
            e.status = 401;
            next(e);
        }
    }
}

module.exports = new UsersCtrl;