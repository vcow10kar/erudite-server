const express = require('express');
const router = express.Router();

const{body, validationResult} = require('express-validator');

const Contest = require('../models/contest.model');

router.get('/', async (req, res) => {
    const contests = await Contest.find({}).lean().exec();

    return res.status(200).send({contests: contests});
})

router.post('/',
    body('title')
    .notEmpty()
    .withMessage('Contest title is required!'),
    body('type')
    .notEmpty()
    .withMessage('Contest type is required!'),
    body('deadline')
    .notEmpty()
    .withMessage('Contest deadline is required!'),
    body('tags')
    .notEmpty()
    .withMessage('Contest tags are required!'),
    body('duration')
    .notEmpty()
    .withMessage('Contest duration is required!'),
    body('marks')
    .notEmpty()
    .withMessage('Contest marks are required!'),
    body('batchNo')
    .notEmpty()
    .withMessage('Batch No. is required!'),

    async(req, res) => {
        //console.log("Request Body:", req.body);
        const errors = validationResult(req);

       //console.log(errors);

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

            //console.log("Request Body:", req.body);
            const contest = await Contest.create(req.body);

            //console.log(contest);

            return res.status(201).send({contest: contest});
        } catch(err) {
            //console.log(err);
            return res.status(400).send({error: err.message});
        }
    }
);


module.exports = router;