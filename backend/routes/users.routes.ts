import { Router } from 'express';

import {
  getUserController,
  getUsersController,
  createUserController,
} from '@controllers/users.controller';
import authMiddleware from '@middlewares/auth.middleware';
import { signupBodySchema } from '@validations/user.validations';
import validationMiddleware from '@middlewares/validation.middleware';

const userRouter = Router();

// @route   GET /users
// @desc    Route for getting all users.
// @access  Public
userRouter.get('/', getUsersController);

// @route   GET /users/:userId
// @desc    Route for getting a particular user.
// @access  Public
userRouter.get('/:userId', authMiddleware, getUserController);

// @route   POST /users
// @desc    Route for registring a user.
// @access  Public
userRouter.post('/', validationMiddleware(signupBodySchema), createUserController);

export default userRouter;
