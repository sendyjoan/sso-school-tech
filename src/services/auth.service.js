import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepo from '../repositories/user.repository.js';

const JWT_SECRET = process.env.JWT_SECRET;

async function register({ name, email, password }) {
    const existingUser = await userRepo.findUserByEmail(email);
    if (existingUser) throw new Error('User already exists');

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ name, email, password: hashed });
    return { id: user.id, email: user.email };
}

async function login({ email, password }) {
    const user = await userRepo.findUserByEmail(email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
}

async function getMe(userId) {
    const user = await userRepo.findUserById(userId);
    if (!user) throw new Error('User not found');
    return { id: user.id, email: user.email, name: user.name };
}

export default {
    register,
    login,
    getMe,
};