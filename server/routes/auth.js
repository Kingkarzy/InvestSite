import express from 'express';
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import User from '../models/user.js';
import nodemailer from 'nodemailer';

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
        // Send registration success email to the user
        const transporter = nodemailer.createTransport({
            // Configure your email provider settings here
            // For example, if you're using Gmail:
            host: 'goobull.com',
            port: 465, // Your SMTP port
            secure: true, // Set to true if you're using SSL/TLS
            auth: {
                user: 'no-reply@goobull.com',
                pass: process.env.SMTP_PASSWORD,
            },
        });

        const mailOptions = {
            from: 'no-reply@goobull.com',
            to: req.body.email,
            subject: 'Registration Successful',
            text: `Congratulations, ${req.body.username}!
Your account has been successfully registered.

It will be approved within 24 hours. Good luck investing!

Best regards,
Goobull Investment Team`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
})


// LOGIN
router.post('/login', async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });
        if (!user) return res.status(400).json({ msg: "User does not exist." });

        const approved = user.isApproved;
        if (!approved) return res.status(400).json({ msg: "User not approved." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ msg: "Invalid credentials." });

        const token = jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );
        delete user._doc.password;
        res.status(200).json({ ...user._doc, token });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router

