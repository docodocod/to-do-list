const db=require('../db');
const {v4 : uuidv4} = require('uuid');

exports.getTodos=(req,res)=> {
    db.all('select * from todos', (err, rows) => {
        if (err) {
            res.status(400)
            throw new Error('no data')
        }
        res.status(200).json({todos: rows, message: ""})
    })
}

exports.createTodo=(req,res)=>{
    const {value, completed}=req.body
    const id=uuidv4();

    db.run('insert into todos(id,title,completed) values(?,?,?)',[id,value,false],err=>{
        if(err){
            res.status(400)
            throw new Error("could not insert data")
        }
        res.status(201).json({
            todos: {id, title: value, completed},
            message: 'success'
        })
    })
}

exports.updateTodo=(req,res)=>{
    const {id}=req.params
    const {value}=req.body

    db.run('update todos set title=? where id=?',[value,id]).all(
        "select * from todos",
        (err,rows)=>{
            if(err){
                res.status(400)
                throw new Error('could not update data')
            }
            res.status(200).json({todos: rows, message: `update ${value}` })
        }
    )
}

exports.completeTodo=(req,res)=>{
    const {id}=req.params
    const {completed}=req.body

    db.run('update todos set completed = ? where id = ?',[completed,id]).all(
        "select * from todos",
        (err,rows)=>{
            if(err){
                res.status(400)
                throw new Error("could not update data")
            }

            res.status(200).json({todos:rows,message:${completed ? "완료":"진행중"}})
        }
    )
}

exports.deleteTodo=(req,res)=>{
    const {id}=req.params
    db.run("delete from todos where=?",[id]).all(
        "select * from todos",
        (err,rows)=>{
            if(err){
                res.status(400)
                throw new Error("could not bring data")
            }
            res.status(200).json({todos:rows,message:"delete success"})
        }
    )
}