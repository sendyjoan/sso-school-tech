import express from 'express';
import controller from '../controllers/auth.controller.js';
import { authenticate } from '../utils/jwt.js';
import multer from 'multer';
const upload = multer();
import { validate } from '../middlewares/validation.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

router.post('/register', upload.none(), validate(registerSchema), controller.register);
router.post('/login', upload.none(), validate(loginSchema), controller.login);
router.get('/me', authenticate, upload.none(), controller.getMe);

export default router;