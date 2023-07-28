const query = require('./db/mysql')

console.log(query("SELECT * FROM meal"))