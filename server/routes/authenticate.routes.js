import express from 'express';
import authController from '../controllers/authenticate.controller';

const router = express.Router()

//Handle sign in
router.route('/auth/signin')
  .post(authController.signin);

//Handle sign out
router.route('/auth/signout')
  .get(authController.signout);

//Handle admin sign in
router.route('/admin/signin')
  .post(authController.adminSignin);

//Handle admin sign out
router.route('/admin/signout')
  .get(authController.adminSignout);

export default router;
