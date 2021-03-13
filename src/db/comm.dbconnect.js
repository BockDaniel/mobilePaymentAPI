// get the required modules
require('dotenv').config();
const mysql = require('mysql2');


// create the connection class
class DBConnection {
    constructor(){
        this.db = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME,
            port: 8889
        });

        this.checkConnections();
    }

    // check the connection status
    checkConnections(){
        this.db.getConnection((err, connection) => {
            if(err){
                if(err.code === 'PROTOCOL_CONNECTION_LOST') {
                    console.error('Database connection was closed');
                }
                if(err.code === 'ER_CON_COUNT_ERROR') {
                    console.error('Database has too many connections.')
                }
                if(err.code === 'ECONREFUSED'){
                    console.error('Database connection was refused.')
                }
            }
            if(connection){
                connection.release();
            }
            return;
        });
    }

    // creating a query function for executing prepared statements
    query = async (sql, ...values) => {
        return new Promise((resolve, reject) => {
            const callback = (err, results) => {
                if(err){
                    reject(err);
                    return;
                }
                resolve(results);
            }
            
            // execute the query using prepared statements
            this.db.execute(sql, values, callback)
        }).catch(err => {
            // basic error handling for now
            throw err;
        });
    }
}

// exporting the query function
module.exports = new DBConnection().query;