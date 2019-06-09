import express from 'express';
import userController from '../controllers/user.controller';
import authenticateController from '../controllers/authenticate.controller';

const router = express.Router();

router.route('/api/users')
  .get(userController.list)
  .post(userController.create);


router.route('/api/users/:userId')
  .get(authenticateController.requireSignin, userController.read)
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, userController.update)
  .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, userController.remove);

router.param('userId', userController.userById);

export default router;
