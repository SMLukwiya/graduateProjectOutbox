import express from 'express'
import userController from '../controllers/user.controller'
import orderController from '../controllers/order.controller'
import authController from '../controllers/authenticate.controller'

const router = express.Router()

// Create user order
router.route('/api/orders/:userId')
  .post(authController.requireSignin, orderController.create)

// Read specific order for user
router.route('/api/order/:orderId')
  .get(orderController.read)

// List all orders associated with a user
router.route('/api/orders/user/:userId')
  .get(authController.requireSignin, orderController.listByUser)

// Delete Orders associated with a user
router.route('/api/orders/:orderId')
    .delete(authController.requireSignin, orderController.remove)

router.param('userId', userController.userById)
router.param('orderId', orderController.orderById)

export default router
