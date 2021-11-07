import React from 'react';
import { Grid } from '@mui/material';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';

const Home = () => {
    return (
        <div>

            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={6}>

                    <ContactForm />

                </Grid>
                <Grid item xs={6}>

                    <ContactFilter />
                    <Contacts />

                </Grid>

            </Grid>

        </div>
    )
}

export default Home;
