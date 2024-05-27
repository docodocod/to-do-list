const db=require('../db');

//할일 목록들 가져오기
exports.getTodos=async (req,res)=> {
    const connection = await db.getConnection();
    try {
        const sql = "select * from todos";
        const rows = await connection.query(sql)
        await connection.commit()
        res.json(rows)
    }catch(err){
        console.log(err);
        await connection.rollback()
    }finally{
        connection.release();
    }
}

//할일 목록 생성
exports.createTodo=async (req,res) => {
    const {value, completed}=req.body
    const connection=await db.getConnection();
    try {
        const sql = `insert into todos(title,completed) values(${value},${completed})`;
        const rows = await connection.query(sql);
        await connection.commit();
    }catch(err) {
        console.log(err);
        await connection.rollback();
    }finally{
        await connection.release()
    }
}

//할일 목록 수정
exports.updateTodo=async (req,res)=>{
    const {id}=req.params
    const {value}=req.body
    const connection=await db.getConnection();
    try{
        const sql=`update set title=${value} where id=${id}`
        await connection.query(sql);
        await connection.commit();
        res.json({message: "update success"})
    }catch(err){
        console.log(err);
        await connection.rollback();
    }finally{
        await connection.release();
    }
}

//할일 목록 check 여부
exports.completeTodo=async (req,res)=>{
    const {id}=req.params
    const {completed}=req.body
    const connection=await db.getConnection();
    try{
        const sql=`update todos set completed = ${completed} where = ${id}`
        await connection.query(sql);
        await connection.commit()
        res.json({message:"update success"})
    }catch(err){
        console.log(err);
        await connection.rollback()
    }finally{
        await connection.release()
    }

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