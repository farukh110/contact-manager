const express = require("express");

const router = express.Router();

// api/auth
router.get('/', (req, res) => {

    res.send("get Logged in User");

});

// api/auth
router.post('/', (req, res) => {

    res.send(" Authorize User and get the token");

});

module.exports = router;