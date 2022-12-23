import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const router = Router();

router.get('', UsersController.getAllUsers);
router.get('/:id', UsersController.getUserById);
router.post('', UsersController.createUser);

export default router;
