import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

import User from "../models/user";
import {Error} from "../utils/error"


export const signup = async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({
            method: req.method,
            status: req.statusCode,
            error: errors
        })
    }
    console.log(req.body)
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
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err);
    }
}

export const logIn = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;
    try {
        const user = await User.findOne({ email: email });
        if (!user) {
            const error = new Error('A user with this email could not be found');
            error.statusCode = 401;
            throw error;
        }
        loadedUser = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password!');
            error.statusCode = 401;
            throw error;
        };
        const token = jwt.sign({
            email: loadedUser.email,
            userId: loadedUser._id.toString()
        }, 'somesupersecretsecret',
        { expiresIn: '1h' });
        res.status(200).json({ token:token, userId:loadedUser._id.toString() });
        return;
    } catch (err: any) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
        return err;
    };
};