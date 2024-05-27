const express=require('express');
const router=express.Router()
const {getTodos,getTodo,createTodo,updateTodo,completeTodo,deleteTodo}=require('../controllers/todoController');

//전체 할일 조회
router.get('/todos',getTodos);

//할일 추가
router.post('/todos/create',createTodo);

//할일 수정
router.put('/todos/:id',updateTodo);

//할일 토글
router.patch('/todos/:id',completeTodo);

//할일 삭제
router.delete('/todos/:id',deleteTodo);

module.exports=router;