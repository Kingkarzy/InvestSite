import express from 'express'
import { verifyUserToken } from './verifyToken.js'

import Withdraw from '../models/withdraw.js'
import User from '../models/user.js'

const router = express.Router()

//CREATE WITHDRAWAL 
router.post("/", verifyUserToken, async (req, res) => {
    const newWithdraw = new Withdraw(req.body)
    try {
        const savedWithdraw = await newWithdraw.save()
        res.status(200).json(savedWithdraw)
    } catch (error) {
        res.status(500).send(error)
    }
})


//READ USER WITHDRAWALS
router.get('/:userId/', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const withdrawals = await Withdraw.find({ userId });
        res.status(200).json(withdrawals);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})


export default router