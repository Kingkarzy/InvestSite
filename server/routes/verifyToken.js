import jwt from "jsonwebtoken";

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, "../.env") });
export const verifyToken = async (req, res, next) => {
    try {
        // header("Access-Control-Allow-Origin: *");
        /*  let token = req.header("Authorization");
 
         if (!token) {
             return res.status(403).send("Access Denied!!");
         }
 
         if (token.startsWith("Bearer ")) {
             token = token.slice(7, token.length).trimLeft();
             return res.status(401).send('You are not auth')
         }
 
         const verified = jwt.verify(token, process.env.JWT_SECRET);
         req.user = verified;
         next(); */


        const authHeader = req.headers.token;
        if (authHeader) {
            const token = authHeader.split(" ")[1];
            jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
                if (err) res.status(403).json("Token Not Valid!")
                req.user = user
                next();
            })
        } else {
            return res.status(401).json('You Are Not Authorized')
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Access Denied!!")
        }
    })
}

export const verifyUserToken = async (req, res, next) => {
    try {
        //header("Access-Control-Allow-Origin: *");
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied.");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const verifyTokenAndAdmin = (req, res, next) => {
    verifyUserToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        } else {
            res.status(403).json("Access Denied")
        }
    })
}
