import { Router } from 'express';
import { getUsers } from '../controllers/user.controller';

const router = Router();

router.get('/', (req, res, next) => {
  getUsers(req, res).catch(next);
});

export default router;