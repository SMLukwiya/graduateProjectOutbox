import express from 'express';
import userController from '../controllers/user.controller';
import authenticateController from '../controllers/authenticate.controller';

const router = express.Router();

// Create user
router.route('/api/users')
  .post(userController.create)

// Read user by user unique Id
router.route('/api/user/:uniqueId')
  .get(authenticateController.requireSignin, userController.read)

router.param('uniqueId', userController.userById);

export default router;
