const express = require("express");
const config = require("config");
const { check, validationResult } = require("express-validator");
const auth = require("../../../middleware/auth");
const User = require("../../../models/user/User");
const Contact = require("../../../models/contact/Contact");

const router = express.Router();

// api/contact get all users contacts
router.get('/', auth, async (req, res) => {

    try {
        
        const contacts = await Contact.find({ user: req.user.id }).sort({

            date: -1

        })
        res.json(contacts);

    } catch (err) {
        console.error(err.message);
        res.status(500).send(" Server Error ");
    }
    
});

// api/contact post add a new contact
router.post('/', [ auth, [
    check('name', 'Name is required').not().isEmpty()
] ], async (req, res) => {

    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
        
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, type } = req.body;

    try {
        
        const newContact = new Contact({

            name,
            email,
            phone,
            type,
            user: req.user.id
        });

        const contact = await newContact.save();

        res.json(contact);

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send("Server Error");
    }
});

// api/contact put update a contact
router.put('/:id', auth, async (req, res) => {

    const { name, email, phone, type } = req.body;

    const contactFields = { };

    if(name) contactFields.name = name;
    if(email) contactFields.email = email;
    if(phone) contactFields.phone = phone;
    if(type) contactFields.type = type;

    try {
        
        let contact = await Contact.findById(req.params.id);

        // check if the contact exists 
        if(!contact) return res.status(404).json({ msg: "this contact does not exists" })

        // if the contact exists then make sure the currently signed in user own.
        if (contact.user.toString() !== req.user.id) {
            
            return res.status(401).json({ msg: 'You do not have the correct authorization to update this contact.' })         
        }

        // update contact if above condition is passed

        contact = await Contact.findByIdAndUpdate(req.params.id,
            { $set: contactFields },
            { new: true }
            );
        
        // Return the updated contact
        res.json(contact); 

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }
     
});

// api/contact delete delete a contact
router.delete('/:id', async (req, res) => {

     try {
        
        let contact = await Contact.findById(req.params.id);

        // check if the contact exists 
        if(!contact) return res.status(404).json({ msg: "this contact does not exists" });

        // if the contact exists then make sure the currently signed in user own.
        if (contact.user.toString() !== req.user.id) {
            
            return res.status(401).json({ msg: " You do not have the correct authorization " });            
        }

        // find and remove the contact in MongoDB

        await Contact.findByIdAndRemove(req.params.id);
        
        // confirmation message
       
        res.json({ msg: " this contact has been deleted " }); 

    } catch (err) {
        
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

module.exports = router;