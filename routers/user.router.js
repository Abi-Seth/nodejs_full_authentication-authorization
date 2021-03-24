const express = require('express');
const userRouter = express.Router();

const { addUser, getAllUsers, getUserById, updateUser, deleteUser} = require('../controllers/user.controllers');

userRouter.post('/', addUser);
userRouter.get('/getAllUsers', getAllUsers);
userRouter.get('/getUserById/:id', getUserById);
userRouter.put('/updateUser/:id', updateUser);
userRouter.delete('/deleteUser/:id', deleteUser);

module.exports = userRouter;