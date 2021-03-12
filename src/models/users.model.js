// get the required modules
const query = require('../db/comm.dbconnect');

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
}

// export the users model class
module.exports = new Users