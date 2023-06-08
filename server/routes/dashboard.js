import express from 'express'

// IMPORT VERIFICATION TOKENS
import { verifyTokenAndAuthorization, verifyUserToken } from './verifyToken.js'

// IMPORT MONGOOSE SCHEMAS
import Deposit from '../models/deposit.js'
import Withdraw from '../models/withdraw.js'
import Referral from '../models/referral.js'
import Plan from '../models/plan.js'
import User from '../models/user.js'

const router = express.Router()


//CREATIONS
//CREATE DEPOSIT 
router.post("/deposit", verifyUserToken, async (req, res) => {
    // const newDeposit = new Deposit(req.body)
    // try {
    //     const savedDeposit = await newDeposit.save()
    //     res.status(200).json(savedDeposit)
    // } catch (error) {
    //     res.status(500).send(error)
    // }

    try {
        const { userId, amount, mode, status, date } = req.body;
        const user = await User.findById(userId);

        const newDeposit = new Deposit({
            userId,
            amount,
            mode,
            status,
            date,
        });
        await newDeposit.save();
        user.deposited += newDeposit.amount;
        await user.save();

        const deposit = await Deposit.find();

        res.status(201).json(deposit);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})

//CREATE WITHDRAWAL 
router.post("/withdraw", verifyUserToken, async (req, res) => {
    const newWithdraw = new Withdraw(req.body)
    try {
        const savedWithdraw = await newWithdraw.save()
        const user = await User.findById(req.body.userId);
        user.withdrawn += savedWithdraw.amount;
        await user.save();

        res.status(200).json(savedWithdraw)
    } catch (error) {
        res.status(500).send(error)
    }
})

//CREATE REFERRAL 
router.post("/referral", verifyTokenAndAuthorization, async (req, res) => {
    const newReferral = new Referral(req.body)
    try {
        const savedReferral = await newReferral.save()
        res.status(200).json(savedReferral)
    } catch (error) {
        res.status(500).send(error)
    }
})
//CREATE PLAN 
router.post("/plan", verifyTokenAndAuthorization, async (req, res) => {
    const newPlan = new Plan(req.body)
    try {
        const savedPlan = await newPlan.save()
        res.status(200).json(savedPlan)
    } catch (error) {
        res.status(500).send(error)
    }
})


// READ
//READ USER DEPOSITS
router.get('/:userId/deposits', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const deposit = await Deposit.find({ userId });
        res.status(200).json(deposit);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})
//READ USER WITHDRAWALS
router.get('/:userId/withdrawals', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const withdrawals = await Withdraw.find({ userId });
        res.status(200).json(withdrawals);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})
//READ USER REFERRALS
router.get('/:userId/referrals', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const referrals = await Referral.find({ userId });
        res.status(200).json(referrals);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})




export default router
