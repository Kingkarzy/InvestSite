import express from 'express'
import { verifyTokenAndAdmin, verifyUserToken } from './verifyToken.js'

import Deposit from '../models/deposit.js'
import Withdraw from '../models/withdraw.js'
import User from '../models/user.js'
import Plan from '../models/plan.js'

const router = express.Router()

// DEPOSIT ROUTES
//READ ALLUSER DEPOSITS
router.get('/deposits', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let deposits;
        if (query) {
            deposits = await Deposit.find().sort({ _id: -1 });
        } else {
            deposits = await Deposit.find();
        }

        // Map over deposits and add image URL to each deposit
        const depositsWithImages = deposits.map((deposit) => {
            const depositWithImage = deposit.toObject();
            const imageName = deposit.picturePath; // Assuming the image field in the Deposit model stores the image name

            // Get the server's public URL
            const serverUrl = new URL(req.protocol + '://' + req.get('host'));

            // Construct the image URL based on the server's public URL and the image path
            const imageUrl = new URL('/assets/' + imageName, serverUrl).toString();

            depositWithImage.imageUrl = imageUrl; // Add the image URL to the deposit object
            return depositWithImage;
        });

        res.status(200).json({ deposits: depositsWithImages });
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE DEPOSIT STATUS
router.patch('/deposits/:depositId/:userId/users', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { userId, depositId } = req.params;
        const user = await User.findById(userId);
        const deposit = await Deposit.findById(depositId);

        if (deposit.status === 'pending') {
            deposit.status = 'Approved';
            user.balance += deposit.amount;
            user.deposited += deposit.amount;
        }

        await Promise.all([user.save(), deposit.save()]);
        res.status(200).json({ message: 'Deposit update successful' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// WITHDRAWAL ROUTES
//READ ALL USER WITHDRAWALS
router.get('/withdrawals', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let withdrawals;
        if (query) {
            withdrawals = await Withdraw.find().sort({ _id: -1 });
        } else {
            withdrawals = await Withdraw.find();
        }
        res.status(200).json({ withdrawals });
    } catch (err) {
        res.status(500).json(err);
    }
});

// UPDATE WITHDRAWAL STATUS
router.patch('/withdrawals/:withdrawalsId/:userId/users', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { userId, withdrawalsId } = req.params;
        const user = await User.findById(userId);
        const withdraws = await Withdraw.findById(withdrawalsId);

        if (withdraws.status === 'pending') {
            withdraws.status = 'Approved';
            user.balance -= withdraws.amount;
            user.withdrawn += withdraws.amount;
        }

        await Promise.all([user.save(), withdraws.save()]);
        res.status(200).json({ message: 'Deposit update successful' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});



// USER ROUTES
// GET USER STATS
router.get('users/stats', verifyTokenAndAdmin, async (req, res) => {
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

// GET ALL USERs
router.get('/users', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let users;
        if (query) {
            users = await User.find()
                .sort({ _id: -1 })
                .select('id username email firstName lastName isApproved balance');
        } else {
            users = await User.find().select('id username email firstName lastName isApproved balance');
        }

        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json(err);
    }
});


// GET USER
router.get('/users/:id', verifyUserToken, async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        delete user._doc.password;
        res.status(200).json({ ...user._doc });
    } catch (err) {
        res.status(500).json(err)
    }
})

//UPDATE USER (APPROVAL)
router.patch('/users/approve/:userId', verifyTokenAndAdmin, async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (user.isApproved === false) {
            user.isApproved = true;
        } else {
            user.isApproved = false
        }
        await user.save()
        res.status(200).json({ message: 'User approved successful' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});




// PLAN ROUTES
//READ ALL USER PLANS
router.get('/plans', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let plans;
        if (query) {
            plans = await Plan.find().sort({ _id: -1 });
            const plansWithUsernames = await Promise.all(
                plans.map(async (plan) => {
                    const user = await User.findById(plan.userId);
                    plan.username = user.username;
                    return plan;
                })
            );
            res.status(200).json({ plansWithUsernames });
        } else {
            plans = await Plan.find();
            const plansWithUsernames = await Promise.all(
                plans.map(async (plan) => {
                    const user = await User.findById(plan.userId);
                    plan.username = user.username;
                    return plan;
                })
            );
            res.status(200).json({ plansWithUsernames });
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/plans', verifyTokenAndAdmin, async (req, res) => {
    try {
        const query = req.query.new;
        let plans;
        if (query) {
            plans = await Plan.find().sort({ _id: -1 });
        } else {
            plans = await Plan.find();
        }

        const plansWithUsernames = await Promise.all(
            plans.map(async (plan) => {
                const user = await User.findById(plan.userId);
                plan.username = user.username;
                return plan;
            })
        );

        res.status(200).json({ plansWithUsernames });
    } catch (err) {
        res.status(500).json(err);
    }
});



export default router