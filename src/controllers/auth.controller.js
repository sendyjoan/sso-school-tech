import authService from '../services/auth.service.js';

const register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const login = async (req, res) => {
    try {
        console.log(req.body);
        const result = await authService.login(req.body);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.status(401).json({ error: err.message });
    }
};

const getMe = async (req, res) => {
    try {
        const user = await authService.getMe(req.userId);
        res.json(user);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
};

export default {
    register,
    login,
    getMe,
};
