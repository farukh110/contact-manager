import React, { useContext, useEffect, useState } from 'react';
import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {

        if (isAuthenticated) {

            props.history.push("/");
        }

        if (error === "A user with this email address already exists") {

            setAlert(error, 'danger');
            clearErrors();
        }
    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const { name, email, password, cpassword } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {

        e.preventDefault();

        if (name === '' || email === '' || password === '') {

            setAlert("Please enter all fields", "danger");

        } else if (password !== cpassword) {

            setAlert("password and confirm password are not matched", "danger");

        } else {
            // console.log("user registered");
            register({
                name,
                email,
                password
            })
        }
    }

    return (
        <div>

            <Container maxWidth="sm">

                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

                    <form onSubmit={onSubmit}>

                        <h3> User Registration </h3>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm container>

                                <TextField label="Name" fullWidth name='name' value={name} variant="outlined" onChange={onChange} />

                                <TextField label="Email" fullWidth name='email' value={email} variant="outlined" onChange={onChange} />

                                <TextField label="Password" fullWidth name='password' value={password} variant="outlined" onChange={onChange} minLength="6" />

                                <TextField label="Confirm Password" fullWidth name='cpassword' value={cpassword} variant="outlined" onChange={onChange} minLength="6" />

                                <Button type="submit" variant="contained"> Register </Button>

                            </Grid>
                        </Grid>

                    </form>
                </Paper>

            </Container>

        </div>
    )
}

export default Register;
