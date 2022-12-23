import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const router = Router();

router.get('', UsersController.getAllUsers);
router.get('/:id', UsersController.getUser);
router.post('', UsersController.createUser);
router.patch('/me', UsersController.updateUser);
router.patch('/me/avatar', UsersController.updateAvatar);

export default router;
