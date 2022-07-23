const express = require('express');
const user = require('../src/models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
require('dotenv').config();

const router = express.Router();

router.use(express.json());

//Register a new user it does not require user to be authenticated

router.post('/register', async (req, res)=>{

    try {
        
        if(req.body.Password === req.body.confirmPassword) {

            const User = await user.create({
                Name: req.body.Name,
                Email: req.body.Email,
                Password: req.body.Password
            });

            const id = User.id;

            const token = jwt.sign(id, process.env.JWT_SECRETE_KEY);

            res.status(200).json({success: true, authToken: token});

        }
        else {

            res.status(400).json({success: false, error: "Password and Confirm Password must be same!"});
        }
    } catch (error) {
        
        res.status(500).json({success: false, error: "Internal Server Error!"});
    }
});

//Logging in the user it does not require user to be authenticated

router.post('/login', async (req, res)=>{

    try {
        
        const email = req.body.Email;

        const User = await user.findOne({Email: email});
        
        if(!User) {

            res.status(400).json({success: false, error: "Invalid Email or Password!"});

            return;
        }

        const isMatched = await bcrypt.compare(req.body.Password, User.Password);

        if(isMatched) {

            const id = User.id;

            const token = jwt.sign(id, process.env.JWT_SECRETE_KEY);

            res.status(200).json({success: true, authToken: token});
        }
        else {

            res.status(400).json({success: false, error: "Invalid Email or Password!"});

        }

    } catch (error) {
        
        res.status(500).json({success: false, error});
    }
});

module.exports = router;