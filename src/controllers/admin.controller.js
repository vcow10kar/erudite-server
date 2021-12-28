const { response } = require('express');
const express = require('express');
const router = express.Router();

const{body, validationResult} = require('express-validator');

const Admin = require('../models/admin.model');

router.post('/',
    body('emailId')
    .notEmpty()
    .withMessage('Email Id is required!')
    .isEmail()
    .withMessage('Please enter a valid Email Id!'),
    body('password')
    .notEmpty()
    .withMessage('Password is required!')
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]/)
    .withMessage('Invalid Password!')
    .isLength({min: 8, max: 20})
    .withMessage('Password should be 8-20 characters long!'),

    async(req, res) => {
        const errors = validationResult(req);

        let finalErrors = null;
        if(!errors.isEmpty()) {
            finalErrors = errors.array().map((error) => {
                return {
                    param: error.param,
                    message: error.msg
                };
            });

            return res.status(401).send({error: JSON.stringify(finalErrors)});
        }

        try {
            const admin = await Admin.create(req.body);

            return res.status(201).send({admin});
        } catch(err) {
            return res.status(400).send({error: err.message});
        }
    }
);


module.exports = router;