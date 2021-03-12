// get the required modiles
const usersModel = require('../models/users.model');
const HttpException = require('../utils/HttpErrror.utils');
const httpExec = require('../utils/HttpErrror.utils');

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
}

module.exports = new UsersCtrl;