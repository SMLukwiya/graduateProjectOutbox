import express from 'express';
import rentController from '../controllers/rent.controller';
import authenticateController from '../controllers/authenticate.controller';

const router = express.Router();

router.route('/api/rent')
  .get(rentController.list)
  .post(rentController.create)

router.route('/api/rent/image/:houseId')
  .get(rentController.image)

router.route('/api/renthouse/:houseId')
  .get(rentController.read);
   .put(authenticateController.requireSignin, authenticateController.hasAuthorization, rentController.update)
   .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, rentController.remove)

router.param('houseId', rentController.houseById);

export default router;
