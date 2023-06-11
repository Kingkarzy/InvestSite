import express from 'express'
import { verifyUserToken } from './verifyToken.js'
import Referral from '../models/referral.js'

const router = express.Router()

//CREATE REFERRAL 
router.post("/", verifyUserToken, async (req, res) => {
    const newReferral = new Referral(req.body)
    try {
        const savedReferral = await newReferral.save()
        res.status(200).json(savedReferral)
    } catch (error) {
        res.status(500).send(error)
    }
})

//READ USER REFERRALS
router.get('/:userId/', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const referrals = await Referral.find({ userId });
        res.status(200).json(referrals);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

export default router
