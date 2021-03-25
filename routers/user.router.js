const express = require('express');
const userRouter = express.Router();

const { addUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/user.controllers');
const { login } = require('../controllers/auth.controllers');

userRouter.post('/', addUser);
// userRouter.get('/getAllUsers', getAllUsers);
// userRouter.get('/getUserById/:id', getUserById);
// userRouter.put('/updateUser/:id', updateUser);
// userRouter.delete('/deleteUser/:id', deleteUser);

userRouter.post('/login', login);

module.exports = userRouter;