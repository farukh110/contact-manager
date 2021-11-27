import React, { useContext, useEffect } from 'react';
import { Grid } from '@mui/material';
import Contacts from '../contacts/Contacts';
import ContactForm from '../contacts/ContactForm';
import ContactFilter from '../contacts/ContactFilter';
import AuthContext from '../../context/auth/authContext';

const Home = () => {

    const authContext = useContext(AuthContext);

    useEffect(() => {

        authContext.loadUser();
        // eslint-disable-next-line

    }, []);

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
