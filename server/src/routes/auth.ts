import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

const generateToken = (userId: string): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
        expiresIn: '7d',
    });
};

// POST /api/auth/register
router.post('/register', async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            res.status(400).json({ success: false, message: 'All fields are required' });
            return;
        }

        if (password.length < 6) {
            res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
            return;
        }

        const existingUser = await User.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            res.status(409).json({ success: false, message: 'Email already registered' });
            return;
        }

        const user = await User.create({ name, email, password });
        const token = generateToken(user._id.toString());

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ success: false, message: 'Server error during registration' });
    }
});

// POST /api/auth/login
router.post('/login', async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            res.status(400).json({ success: false, message: 'Email and password are required' });
            return;
        }

        const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
        if (!user) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            res.status(401).json({ success: false, message: 'Invalid email or password' });
            return;
        }

        const token = generateToken(user._id.toString());

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ success: false, message: 'Server error during login' });
    }
});

// GET /api/auth/me
router.get('/me', authMiddleware, async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            res.status(404).json({ success: false, message: 'User not found' });
            return;
        }

        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                createdAt: user.createdAt,
            },
        });
    } catch (error) {
        console.error('Get me error:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;
