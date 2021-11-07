import React, { useContext, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import ContactContext from '../../context/contact/contactContext';

const ContactFilter = () => {

    const contactContext = useContext(ContactContext);
    const { filterContacts, clearFilter, filtered } = contactContext;
    const text = useRef('');

    useEffect(() => {

        if (filtered === null) {

            text.current.value = '';
        }

    })

    const onChange = e => {

        if (text.current.value !== '') {
            filterContacts(e.target.value);
        } else {
            clearFilter();
        }
    }

    return (
        <div>

            <form>
                <TextField fullWidth ref={text} onChange={onChange} label="Filter Contact" variant="outlined" />
            </form>

        </div>
    )
}

export default ContactFilter;
