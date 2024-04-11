const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Adjust the path based on your project structure

router.post("/createuser", async (req, res) => {
    try {
        const newUser = new User({
            name: "Ram",
            password: "123456",
            email: "ram@gmail.com",
            location: "rampur"
        });
        await newUser.save();
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.json({ success: false });
    }
});

module.exports = router;
