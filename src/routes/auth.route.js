import express from 'express';
import controller from '../controllers/auth.controller.js';
import { authenticate } from '../utils/jwt.js';
import multer from 'multer';
const upload = multer();
import { validate } from '../middlewares/validation.js';
import { registerSchema, loginSchema } from '../validators/auth.validator.js';

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     description: Register a new user with name, username, and password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: User's name
 *                 example: "John Doe"
 *               username:
 *                 type: string
 *                 description: User's username
 *                 example: "johndoe"
 *               password:
 *                 type: string
 *                 description: User's password
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: User ID
 *                   example: "vdosnfsdsa-vnojcsla-sdcson"
 *                 username:
 *                   type: string
 *                   description: User's username
 *                   example: "johndoe"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: "User already exists"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *             example: "Internal server error"
 */
router.post('/register', upload.none(), validate(registerSchema), controller.register);
router.post('/login', upload.none(), validate(loginSchema), controller.login);
router.get('/me', authenticate, upload.none(), controller.getMe);

export default router;