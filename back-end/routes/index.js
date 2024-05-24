const express=require('express');
const router=express.Router()
const {getTodos,getTodo,createTodo,updateTodo,completeTodo,deleteTodo}=require('../controllers/todoController');

router.get('/todos',getTodos);
router.get('/todos/:id',getTodo);
router.post('/todos/create',createTodo);
router.put('/todos/:id',updateTodo);
router.patch('/todos/:id',completeTodo);
router.delete('/todos/:id',deleteTodo);

module.exports=router;