const express = require("express");
const config = require("config");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../../../models/user/User");
const router = express.Router();
const auth = require("../../../middleware/auth");

// api/auth
router.get('/', auth, async (req, res) => {

    // res.send("get Logged in User");

    try {

        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
        
    } catch (err) {
       console.error(err.message);
       res.status(500).send("Server Error"); 
    }

});

// api/auth
router.post('/', [

    check('email', 'Please enter a valid email address').isEmail(),
    check('password', 'Please enter a password').exists()

], async (req, res) => {

    const errors = validationResult(req);
   
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() })
    }

    const { email, password } = req.body;

    try {
        
        let user = await User.findOne({ email });

        if (!user) {
            
            return res.status(400).json({ msg: "A User with this email address does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: " Incorrect password. " });
        }

        const payload = {

            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get('jwtSecret'), {
            expiresIn: 3600000            
        }, (err, token) => {

            if(err) throw err;
            res.json({ token });
        })

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

module.exports = router;