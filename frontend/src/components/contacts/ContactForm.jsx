import React, { useContext, useEffect, useState } from 'react';
import { Card, FormControl, FormControlLabel, FormLabel, Button, Radio, RadioGroup, TextField, Stack } from '@mui/material';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    const { addContact, current, clearContact, updateContact } = contactContext;

    useEffect(() => {

        if (current !== null) {

            setContact(current);

        } else {

            setContact({

                name: '',
                email: '',
                phone: '',
                type: 'personal'

            })
        }

    }, [contactContext, current]);

    const [contact, setContact] = useState({

        name: '',
        email: '',
        phone: '',
        type: 'personal'

    });

    const { name, email, phone, type } = contact;

    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {

        e.preventDefault();

        if (current === null) {

            addContact(contact);

        } else {

            updateContact(contact);
        }

        clearAll();
    }

    const clearAll = () => {

        clearContact();
    }

    return (
        <div>
            <Card style={{ padding: '20px' }}>

                <form onSubmit={onSubmit}>

                    <h2 className='text-primary'> {current ? 'Edit Contact' : 'Add Contact'} </h2>

                    <TextField
                        label="name"
                        name="name"
                        fullWidth
                        value={name}
                        onChange={onChange}
                        variant="outlined" />

                    <br /> <br />

                    <TextField
                        label="email"
                        name="email"
                        fullWidth
                        value={email}
                        onChange={onChange}
                        variant="outlined" />


                    <br /><br />

                    <TextField
                        label="phone"
                        name="phone"
                        fullWidth
                        value={phone}
                        onChange={onChange}
                        variant="outlined" />

                    <br /><br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Type</FormLabel>
                        <RadioGroup row aria-label="type" name="row-radio-buttons-group">

                            <FormControlLabel
                                type="radio"
                                value="personal"
                                name="type"
                                checked={type === 'personal'}
                                control={<Radio />}
                                onChange={onChange}
                                label="personal" />

                            <FormControlLabel
                                type="radio"
                                value="professional"
                                name="type"
                                checked={type === 'professional'}
                                control={<Radio />}
                                onChange={onChange}
                                label="professional" />

                        </RadioGroup>
                    </FormControl>

                    <br />
                    <br />

                    <Stack direction="row" spacing={2}>

                        <Button type="submit" variant="contained"> {current ? 'Update Contact' : 'Add Contact'} </Button>

                        {
                            current &&
                            <Button variant="outlined" onClick={clearAll}> Clear All </Button>
                        }

                    </Stack>

                </form>

            </Card>
        </div >
    )
}

export default ContactForm;
