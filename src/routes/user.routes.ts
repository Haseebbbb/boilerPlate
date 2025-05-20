import { Router } from 'express';
import { getUsers, getUserById, createUser, deleteUser } from '../controllers/user.controller';

const router = Router();

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.delete('/users/:id', deleteUser);


export default router;