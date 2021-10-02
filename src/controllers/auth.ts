import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import User from "../models/user";

export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    try {
        const hashedPw = await bcrypt.hash(password, 12);

        const user = new User({
            email:email,
            name:name,
            password:hashedPw
        });
        const result = await user.save();
        res.status(201).json({ message: 'User created!', userId: result._id });
    } catch (error) {
        
    }
}