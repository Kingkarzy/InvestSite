import express from 'express'
import multer from 'multer'
import path, { dirname } from "path"
import { fileURLToPath } from 'url';


// IMPORT VERIFICATION TOKENS
import { verifyTokenAndAuthorization, verifyUserToken } from './verifyToken.js'

// IMPORT MONGOOSE SCHEMAS
import Deposit from '../models/deposit.js'
import Withdraw from '../models/withdraw.js'
import Referral from '../models/referral.js'
import Plan from '../models/plan.js'
import User from '../models/user.js'

// CONFIGURATIONS
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/assets'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });
// Specify the destination directory for uploaded files
const router = express.Router()


//CREATIONS
//CREATE DEPOSIT 
router.post("/deposit", verifyUserToken, upload.single('picture'), async (req, res) => {
    try {
        const { userId, amount, mode, status, date } = req.body;
        const user = await User.findById(userId);

        const newDeposit = new Deposit({
            userId,
            amount,
            mode,
            status,
            picturePath: req.file.filename, // Save the path of the uploaded picture
            date,
        });
        await newDeposit.save();
        user.deposited += newDeposit.amount;
        user.balance += newDeposit.amount;
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
        user.balance -= savedWithdraw.amount;
        await user.save();

        res.status(200).json(savedWithdraw)
    } catch (error) {
        res.status(500).send(error)
    }
})

//CREATE REFERRAL 
router.post("/referral", verifyUserToken, async (req, res) => {
    const newReferral = new Referral(req.body)
    try {
        const savedReferral = await newReferral.save()
        res.status(200).json(savedReferral)
    } catch (error) {
        res.status(500).send(error)
    }
})
//CREATE PLAN 
router.post("/plan", verifyUserToken, async (req, res) => {
    const newPlan = new Plan(req.body)
    const user = await User.findById(req.body.userId);
    user.balance -= newPlan.amount;
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
router.get('/:userId/plans', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const plans = await Plan.find({ userId });
        res.status(200).json(plans);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})


// UPDATE BALANCE AT THE END OF PLAN
/* router.patch('/:userId/balanceUpdate', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById({ userId });
        const plan = await Plan.findOne({ userId });

        const cb = (futureDate) => {
            const currentDate = new Date();
            const timeDifference = futureDate - currentDate.getTime();
            const daysDifference = Math.ceil(
                timeDifference / (1000 * 60 * 60 * 24)
            );
            if (daysDifference == 0) {
                return 0;
            }
            return daysDifference;
        }
        if ((cb(new Date(plan.duration)) == 0) && (plan.status !== "Completed")) {
            user.balance += (plan.amount * 1.25)
            plan.status = "Completed"
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}) */

// ...

// Schedule the task to run every day at a specific time (e.g., 12:00 AM)



export default router
