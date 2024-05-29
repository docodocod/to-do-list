const express=require('express');
const router=express.Router();
const {isNotLoggedIn,isLoggedIn}=require('../middleware/index');
const {login,join}=require('../controllers/authController');

//로그인
router.post('/login',isNotLoggedIn,login);

//회원가입
router.post('/join',join);
