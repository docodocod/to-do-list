require('dotenv').config();

module.exports={
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "pig_diary",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: true
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "pig_diary_test",
        host: "127.0.0.1",
        dialect: "mysql"
    },
    production: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: "pig_diary",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    }
}