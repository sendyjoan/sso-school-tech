import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import userRepo from '../repositories/user.repository.js';
import dotenv from 'dotenv';
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

async function register({ name, username, password, app_key }) {
    const existingUser = await userRepo.findUserByUsername(username);
    if (existingUser) throw new Error('User already exists');

    // get data detail app_key dari permission service
    console.log('App Key:', app_key);

    const hashed = await bcrypt.hash(password, 10);
    const user = await userRepo.createUser({ name, username, password: hashed });
    return { id: user.id, username: user.username };
}

async function login({ username, password }) {
    if (!JWT_SECRET) {
        throw new Error('JWT_SECRET is not set in environment variables');
    }
    const user = await userRepo.findUserByUsername(username);
    const permissions = user?.role.rolePermissions.map(rp => rp.permission.name);
    console.log('User found:', user);
    console.log('Permissions:', permissions);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ 
        userId: user.id,
        role: user.role.id,
        permissions: permissions || []
     }, JWT_SECRET, { expiresIn: '1h' });
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