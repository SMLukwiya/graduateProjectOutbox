import express from 'express';
import houseController from '../controllers/house.controller';
import authenticateController from '../controllers/authenticate.controller';

const router = express.Router();

// All houses for sale
router.route('/api/buy')
  .get(houseController.listBuy)

// All houses for rent
router.route('/api/rent')
  .get(houseController.listRent)

// Homepage houses for sale
router.route('/api/homepageBuy')
  .get(houseController.homeBuy)

// Home page houses for rent
router.route('/api/homepageRent')
  .get(houseController.homeRent)

// Retrieve house image from database
router.route('/api/house/image/:houseId')
  .get(houseController.image)

// Read a house
router.route('/api/house/:houseId')
  .get(houseController.read)

router.param('houseId', houseController.houseById)

export default router;
