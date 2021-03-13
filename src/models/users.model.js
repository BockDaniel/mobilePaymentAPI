// get the required modules
const query = require('../db/comm.dbconnect');
const httpError = require('../utils/HttpErrror.utils');

class Users {

    // a function to create a new user
    setUser = async (values) => {
        // create the query to insert the user into the db
        let sql = "INSERT INTO `users`(`fullName`, `contact`, `userPassword`) VALUES (?,?,?)";

        // execute the query with the query module
        const results = await query(sql, values);
        const affectedRows = results ? results.affectedRows : 0;

        return affectedRows;
    }

    // a function to fetch all users
    getAllUsers = async () => {
        // create the query string
        let sql = "SELECT * FROM `users`";

        // execute the query using the query function inthe query module
        const result = await query(sql);
        return result;
    }

    // fetching a particular user from the data store
    getUser = async (values) => {
        // creating the query string
        let sql = "SELECT * FROM `users` WHERE userID = ?";

        // executing the query string with the query module
        const result = await query(sql, values);
        return result;
    }

    // updating a particular user's info
    updateUser = async (values) => {
        // creating the query string
        let sql = "UPDATE `users` SET `fullName`=?,`contact`=? WHERE `userID`=?";
        console.log(values)

        // execute the query string using the query module
        const result = await query(sql, values);
        const affectedRows = results ? result.affectedRows:0;

        return affectedRows;
    }

}

// export the users model class
module.exports = new Users