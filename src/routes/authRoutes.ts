import express from 'express';
import { signup, sendConfirmationCode } from '@controllers/authController';

const router = express.Router();

router.post('/signup', signup);
router.post('/send-confirmation', sendConfirmationCode);
export default router;
