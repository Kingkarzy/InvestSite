import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/user.js';

const router = express.Router();


//REGISTER
router.post('/register', async (req, res) => {
    try {
        const { password } = req.body
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: passwordHash,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
        })
        const savedUser = await newUser.save()
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }

    // LOGIN
    router.post('/login', async (req, res) => {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({ username: username });
            if (!user) return res.status(400).json({ msg: "User does not exist. " });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(401).json({ msg: "Invalid credentials. " });

            const token = jwt.sign(
                {
                    id: user._id,
                    isAdmin: user.isAdmin
                },
                process.env.JWT_SECRET,
                { expiresIn: "3d" }
            );
            delete user._doc.password;
            res.status(200).json({ ...user._doc, token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    })

})

export default router

