import express from 'express';
import buyController from '../controllers/buy.controller';
import authenticateController from '../controllers/authenticate.controller';

const router = express.Router();

router.route('/api/buy')
  .get(buyController.list)
  .post(buyController.create);

router.route('/api/buy/image/:houseId')
  .get(buyController.image);

router.route('/api/buyhouse/:houseId')
  .get(buyController.read)
   .put(authenticateController.requireSignin, authenticateController.hasAuthorization, buyController.update)
   .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, buyController.remove);

router.param('houseId', buyController.houseById);

export default router;
