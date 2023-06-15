import express from 'express'
import multer from 'multer';
import { verifyUserToken } from './verifyToken.js'
import path, { dirname } from "path"
import { fileURLToPath } from 'url';

import Deposit from '../models/deposit.js'
import User from '../models/user.js'

const router = express.Router()

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


//CREATE DEPOSIT 
router.post("/", verifyUserToken, upload.single('picture'), async (req, res) => {
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
        await user.save();

        const deposit = await Deposit.find();

        res.status(201).json(deposit);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
})

//READ USER DEPOSITS
router.get('/:userId', verifyUserToken, async (req, res) => {
    try {
        const { userId } = req.params;
        const deposit = await Deposit.find({ userId });
        res.status(200).json(deposit);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
})

export default router