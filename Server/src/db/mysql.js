const pool = require('./mysqlConnectionPool')

function doCallProcedure(sql) {
    pool((conn) => {
        conn.query(sql, function(err, rows, fields) {
            if (err) {
                console.error('error connecting: ' + err)
            }
            console.log(rows)
        });
        conn.release()
    });
}

module.exports = doCallProcedure;
