import express from 'express';
import userAPIController from '../controllers/user-api-controller.js';
import pinAPIController from '../controllers/pin-api-controller.js';
import passport from 'passport';

const router = express.Router();

router.route('/pins').get(pinAPIController.getAllPins).post(passport.authenticate('jwt', {session: false}), pinAPIController.addNewPin);
router.route('/login').post(passport.authenticate('local', {session: false}), userAPIController.logInUser);
router.route('/register').get(userAPIController.getAllUsers).post(userAPIController.registerNewUser);
router.route('/pins/:pinId').delete(passport.authenticate('jwt', {session: false}), pinAPIController.deletePin);

export default router;