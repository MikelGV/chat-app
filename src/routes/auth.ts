import path from "path";
import expres from "express";
import { Router } from "express";
import { body } from "express-validator";

import User from "../models/user";
import * as authController from "../controllers/auth";

const router = Router();

router.put('/signup', [
    body('email').isEmail().withMessage('Please enter a valid email.').custom((value, {req}) => {
        return User.findOne({email:value}).then(userDoc => {
            if (userDoc) {
                return Promise.reject('E-mail addres already exists!')
            }
        });
    }).normalizeEmail(),
    body('password').trim().isLength({ min: 5 }),
    body('name').trim().not().isEmpty()
],authController.signup
);


export { router };