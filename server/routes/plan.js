import express from 'express'

import Plan from '../models/plan.js'
import User from '../models/user.js'
import { verifyUserToken } from './verifyToken.js'

const router = express.Router()


//CREATE PLAN 
router.post("/", verifyUserToken, async (req, res) => {
    const newPlan = new Plan(req.body)
    const user = await User.findById(req.body.userId);
    user.balance -= newPlan.amount;
    try {
        await user.save();
        const savedPlan = await newPlan.save()
        res.status(200).json(savedPlan)
    } catch (error) {
        res.status(500).send(error)
    }
})

// READ USER PLANS
router.get('/:userId', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const plans = await Plan.find({ userId });
        res.status(200).json(plans);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})
export default router
