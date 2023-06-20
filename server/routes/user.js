import express from 'express';
import bcrypt from 'bcrypt'
import { verifyUserToken } from './verifyToken.js';
import User from '../models/user.js';
const router = express.Router();


//UPDATE USER
router.put('/:id', verifyUserToken, async (req, res) => {
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
router.delete('/:id', verifyUserToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})




export default router

