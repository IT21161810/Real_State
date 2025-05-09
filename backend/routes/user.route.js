import express from 'express';
import {verifyToken} from '../middleware/verifyToken.js';
import { deleteUser, getUser, getUsers, updateUser } from '../controller/user.controler.js';

const router = express.Router();

router.get('/', getUsers)
router.get('/:id',verifyToken,getUser)
router.put('/:id',verifyToken,updateUser)
router.delete('/:id',verifyToken,deleteUser)

export default router