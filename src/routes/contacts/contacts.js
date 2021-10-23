const express = require("express");

const router = express.Router();

// api/contact get all users contacts
router.get('/', (req, res) => {

    res.send("get all contacts");

});

// api/contact post add a new contact
router.post('/', (req, res) => {

    res.send("Add a contact");

});

// api/contact put update a contact
router.put('/:id', (req, res) => {

    res.send("update a contact");

});

// api/contact delete delete a contact
router.put('/:id', (req, res) => {

    res.send("update a contact");

});

module.exports = router;