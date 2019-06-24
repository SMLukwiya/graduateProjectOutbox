import express from 'express';
import authenticateController from '../controllers/authenticate.controller';
import houseController from '../controllers/admincontrollers';

const router = express.Router();

// Admin create a house
router.route('/api/house')
  .post(authenticateController.requireSignin, houseController.create)

// Admin read update and delete house
router.route('/api/admin/:houseId')
  .get(authenticateController.requireSignin, houseController.read)
  .put(authenticateController.requireSignin, authenticateController.hasAuthorization, houseController.update)
  .delete(authenticateController.requireSignin, authenticateController.hasAuthorization, houseController.remove)

// Admin list all available houses
router.route('/api/admin/houses')
  .get(authenticateController.requireSignin, houseController.list)



export default router;
