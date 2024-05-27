const mysql      = require('mysql2/promise');
const dotenv=require('dotenv')
dotenv.config()
const connection = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASSWORD,
    database : 'todos',
    connectionLimit: 5,
});

module.exports=connection