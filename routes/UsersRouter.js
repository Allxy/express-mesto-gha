import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';

const router = Router();

router.get('', UsersController.getAllUsers);
router.get('/me', UsersController.getMe);
router.patch('/me', UsersController.updateInfo);
router.patch('/me/avatar', UsersController.updateAvatar);
router.get('/:id', UsersController.getUser);

export default router;
