import { Router } from 'express';
import UsersController from '../controllers/UsersController.js';
import authMiddleware from '../middlewares/AuthMiddleware.js';

const router = Router();

router.use(authMiddleware);

router.get('', UsersController.getAllUsers);
router.get('/:id', UsersController.getUser);
router.post('', UsersController.createUser);
router.patch('/me', UsersController.updateUser);
router.patch('/me/avatar', UsersController.updateAvatar);

export default router;
