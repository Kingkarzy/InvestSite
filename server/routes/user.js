import express from 'express';
import bcrypt from 'bcrypt'
import { verifyTokenAndAdmin, verifyTokenAndAuthorization } from './verifyToken.js';
import User from '../models/user.js';
const router = express.Router();


//UPDATE USER
router.put('/:id', verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(req.body.password, salt);
        req.body.password = passwordHash
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true })
        res.status(200).json(updatedUser)
    } catch (err) {
        res.status(500).json(err)
    }
})


// DELETE USER
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET USER
router.get('/find/:id', verifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        delete user._doc.password;
        res.status(200).json({ ...user._doc });
    } catch (err) {
        res.status(500).json(err)
    }
})


// GET ALL USERs
router.get('/', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find()
        // delete user._doc.password;
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json(err)
    }
});

// GET USER STATS
router.get('/stats', verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: '$createdAt' },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                }
            }
        ])
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err)
    }
})

export default router

