const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User');

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const jwtsecret = "qwertyuiopasdfghjklzxcvbnm123456"

router.post("/createuser", [
    // Validate email, name, and password
    body('email').isEmail().withMessage('Invalid email'),
    body('name').isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt)

    try {
        // Create a new user object based on request body
        const newUser = new User({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location // Assuming you want to include location if provided
        });

        // Save the new user to the database
        await newUser.save();

        // Respond with success
        return res.json({ success: true });
    } catch (error) {
        // Log any errors and respond with failure
        console.error(error);
        return res.status(500).json({ success: false, message: 'Failed to create user' });
    }
});

//verification is user exists or not 
    router.post("/loginuser",[
        // Validate email, name, and password
        body('email').isEmail().withMessage('Invalid email'),
        body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
    ],async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let email = req.body.email;
        try{
            let userData = await User.findOne({email});
            if(!userData){
                return res.status(400).json({ errors: "Try Logging With Correct Credentials" });

            }
//comapre password hashed with the user typed by decoding
            const pwdCompare = await bcrypt.compare(req.body.password, userData.password)

            if(!pwdCompare){
                return res.status(400).json({ errors: "Try Logging With Correct Credentials" });
            }
            //data has to be an object
            const data = {
                user:{
                    id:userData.id
                }
            }
            const authToken = jwt.sign(data,jwtsecret)


                return res.json({success : true,authToken:authToken})
        } catch (error) {
            // Log any errors and respond with failure
            console.error(error);
            return res.status(500).json({ success: false, message: 'Failed to create user' });
        }

    });



module.exports = router;
