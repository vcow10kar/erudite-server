const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Student = require('../models/student.model');
const authorize = require('../middlewares/authorize');

const newToken = (student) => {
    return jwt.sign({student}, process.env.JWT_SECRET_KEY);
}

router.post('/login', authorize('erudite.school'), async (req, res) => {
    try {
        const student = await Student.findOne({emailId: {$eq:req.body.emailId}});

        if(!student) {
            return res.status(400).json({message: 'Please check your Email Id and password!'});
        }

        let match = student.checkPassword(req.body.password);

        if(!match) {
            return res.status(400).json({message: 'Please check your Email Id and Password!'});
        }

        const token = newToken(student);

        return res.status(200).send({student, token});
    } catch(err) {
        return res.status(400).json({message: 'Something went wrong! Sorry for inconvinience!'});
    }
});

module.exports = router;