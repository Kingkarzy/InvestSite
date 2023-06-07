import express from 'express'

// IMPORT VERIFICATION TOKENS
import { verifyUserToken, verifyTokenAndAuthorization } from './verifyToken'

// IMPORT MONGOOSE SCHEMAS
import Deposit from '../models/deposit'
import Withdraw from '../models/withdraw'
import Referral from '../models/referral'
import Plan from '../models/plan'

const router = express.Router()


//CREATIONS
//CREATE DEPOSIT 
router.post("/deposit", verifyTokenAndAuthorization, async (req, res) => {
    const newDeposit = new Deposit(req.body)
    try {
        const savedDeposit = await newDeposit.save()
        res.status(200).json(savedDeposit)
    } catch (error) {
        res.status(500).send(error)
    }
})

//CREATE WITHDRAWAL 
router.post("/withdraw", verifyTokenAndAuthorization, async (req, res) => {
    const newWithdraw = new Withdraw(req.body)
    try {
        const savedWithdraw = await newWithdraw.save()
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


// UPDATES
// UPDATE PLAN
// router.put("/plan/:id", verifyTokenAndAuthorization, async (req, res) => {
//     try {

//     } catch (error) {
//         res.status(500).json(error)
//     }
// })


export default router
