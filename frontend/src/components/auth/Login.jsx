import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = props => {

    const alertContext = useContext(AlertContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthenticated } = authContext;

    useEffect(() => {

        if (isAuthenticated) {

            props.history.push("/");
        }

        if (error === "wrong password") {
            setAlert(error, 'danger');
            clearErrors();

        }

    }, [error, isAuthenticated, props.history]);

    const [user, setUser] = useState({

        email: '',
        password: ''
    })

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {

        e.preventDefault();

        if (email === '' || password === '') {

            setAlert('Please fill the login form', 'danger');

        } else {

            login({ email, password });

        }
    }

    return (
        <div>

            <Container maxWidth="sm">

                <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>

                    <form onSubmit={onSubmit}>

                        <h3> User login </h3>

                        <Grid container spacing={2}>

                            <Grid item xs={12} sm container>


                                <TextField label="Email" fullWidth name='email' value={email} variant="outlined" onChange={onChange} />

                                <TextField label="Password" fullWidth name='password' value={password} variant="outlined" onChange={onChange} />

                                <Button type="submit" variant="contained"> Login </Button>

                            </Grid>
                        </Grid>

                    </form>
                </Paper>

            </Container>

        </div>
    )
}

export default Login;
