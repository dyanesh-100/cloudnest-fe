import axios from 'axios';
import React, { useState } from 'react';
import logo from '../../assets/images/logo3.png';
import { Link,useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import {  toast } from 'react-toastify'; 
import axiosInstance from '../../axiosInstance';

const SignUpComponent = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate()

    const firstNameHandler = (event) => setFirstName(event.target.value);
    const lastNameHandler = (event) => setLastName(event.target.value);
    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const submitHandler = (event) => {
        event.preventDefault();

        axiosInstance.post(`/signup`, { firstName, lastName, email, password })
            .then((response) => {
                toast.success(`Successfully created account for ${response.data.firstName} ${response.data.lastName}`);
                window.localStorage.setItem('token', response.data.token);
                navigate('/cloudnest/home');
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(`Status: ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    
                    toast.error('No response from server. Please try again later.');
                } else {
                   
                    toast.error(`Error: ${error.message}`);
                }
            });
    };

    return (
        <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '40px', width: '100%' }}>
               
                <Box display="flex" alignItems="center" justifyContent="center" marginBottom={4}>
                    <img src={logo} alt="Brand Logo" style={{ width: '80px', height: '80px', marginRight: '15px', borderRadius: '10%' }} />
                    <Typography variant="h4" style={{ fontWeight: 'bold', color: '#333' }}>
                        CLOUDNEST
                    </Typography>
                </Box>

                <Typography variant="h5" align="center" gutterBottom style={{ marginBottom: '20px', color: '#555' }}>
                    Create Your Account
                </Typography>
                <form onSubmit={submitHandler}>
                    <TextField
                        label="First Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={firstName}
                        onChange={firstNameHandler}
                        required
                    />
                    <TextField
                        label="Last Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={lastName}
                        onChange={lastNameHandler}
                        required
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="email"
                        value={email}
                        onChange={emailHandler}
                        required
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        type="password"
                        value={password}
                        onChange={passwordHandler}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        style={{ marginTop: '20px' }}
                    >
                        Sign Up
                    </Button>
                </form>
                <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                    Already have an account? <Link to="/">Login</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default SignUpComponent;
