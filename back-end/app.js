const express=require('express');
const app=express();
const dotenv=require("dotenv");
const indexRouter=require('./routes/index');
const {urlencoded} = require("express");
dotenv.config()

app.use(express.json())
app.use(urlencoded({extended:true}))

app.use('/',indexRouter);

app.listen(process.env.port,()=>{
    console.log(process.env.port+"번에서 현재 대기중입니다.")
})