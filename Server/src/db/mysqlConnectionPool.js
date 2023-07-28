const mysql = require('mysql')
const config = require('./db.config.json')

const pool = mysql.createPool(config)

function getConnection(callback) {
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err)
        } else {
            callback(conn)
        }
    });
}

module.exports = getConnection;