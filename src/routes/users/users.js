const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require('express-validator');
const User = require('../../../models/user/User');
const jwt = require("jsonwebtoken");
const config = require("config");

// api/users 
router.post('/', [

    check('name', 'Please enter a name').not().isEmpty(),
    check('email', 'Please enter a valid email address').not().isEmpty(),
    check('password', 'Please enter password with at least 6 characters').isLength({ min: 6 })

], async (req, res) => {

    // Register a User
    // res.send("Register a User");
    // res.send(req.body);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });      
    }

    const { name, email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if (user) {
            
            return res.status(400).json({ msg: "A User with this email address already exists " });
        }

        user = new User({

            name,
            email,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // res.send("User created in MongoDB");

        const payload = {

            user: {

                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000
        }, (err, token) => {

            

        });

    } catch (err) {
        
        console.log(err.message);
        res.status(500).send("Server Error");
    }

});

module.exports = router;