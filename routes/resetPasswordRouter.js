import { Router } from 'express';
import validateJOI from '../middlewares/validateJOI.js';
import { resetPassword } from '../controllers/reset.js';
import { forgotPasswordSchema } from '../joi/schemas.js';
import verifyToken from '../middlewares/verifyToken.js';

const resetPasswordRouter = Router();

resetPasswordRouter.post('/forgot', validateJOI(forgotPasswordSchema), resetPassword);

export default resetPasswordRouter;