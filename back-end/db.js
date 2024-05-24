const sqlite3 = require('sqlite3').verbose()
const db=new sqlite3.Database('./todo.db');

db.serialize(()=>{
    db.run('create table if not exists todos(id text, title text, completed boolean)')
})

module.exports=db
