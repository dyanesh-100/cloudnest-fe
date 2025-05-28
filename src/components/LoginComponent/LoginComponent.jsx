import axios from 'axios';
import React, { useState } from 'react';
import logo from '../../assets/images/logo3.png'; 
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';
import {  toast } from 'react-toastify'; 
import axiosInstance from '../../axiosInstance';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const submitHandler = (event) => {
        event.preventDefault();
        axiosInstance
            .post(`/login`, {
                email: email,
                password: password
            })
            .then((response) => {
                if (response.status === 201) {
                    toast.success(`Welcome ${response.data.firstName} ${response.data.lastName}`, {
                        position: "bottom-right",
                      });
                    navigate('/cloudnest/home');
                }
                else{
                    navigate('/');
                }
            })
            .catch((error) => {
                if (error.response) {
                    
                    toast.error(`Status : ${error.response.status} - ${error.response.data.message}`);
                } else if (error.request) {
                    
                    toast.error('No response from server. Please try again later.');
                } else {
                    
                    toast.error(`Error: ${error.message}`);
                }
            });
    };
    const handleGoogleSignIn = async () => {
        try {
            const response = await axiosInstance.get('/page-request');
            const googleAuthUrl = response.data.data;
            window.location.href = googleAuthUrl;
        } catch (error) {
            toast.error("Failed to initiate Google Sign-In");
        }
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
                    Login to Your Account
                </Typography>
                <form onSubmit={submitHandler}>
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
                        Login
                    </Button>
                    <div style={{ textAlign: 'center', margin: '20px 0' }}>or</div>
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={handleGoogleSignIn}
                        style={{ marginBottom: '20px' }}
                    >
                        Sign in with Google
                    </Button>
                </form>
                <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                    New user? <Link to="/signup">Register now</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginComponent;
