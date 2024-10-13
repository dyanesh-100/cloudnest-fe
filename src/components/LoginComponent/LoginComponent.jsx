import axios from 'axios';
import React, { useState } from 'react';
import logo from '../../assets/images/logo3.png'; // Import your logo
import { Link, useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Paper, Box } from '@mui/material';

const LoginComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const emailHandler = (event) => setEmail(event.target.value);
    const passwordHandler = (event) => setPassword(event.target.value);

    const submitHandler = (event) => {
        event.preventDefault();
        axios
            .post(`http://localhost:3500/api/v1/login`, {
                email: email,
                password: password
            })
            .then((response) => {
                if (response.status === 201) {
                    alert(`Welcome ${response.data.firstName} ${response.data.lastName}`);
                    window.localStorage.setItem('token', response.data.token);
                    navigate('/cloudnest/home');
                }
            })
            .catch((error) => {
                alert(`Status : ${error.response.data.status} - ${error.response.data.message}`);
            });
    };

    return (
        <Container maxWidth="xs" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
            <Paper elevation={3} style={{ padding: '40px', width: '100%' }}>
                {/* Logo and Brand Name */}
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
                </form>
                <Typography variant="body2" align="center" style={{ marginTop: '10px' }}>
                    New user? <Link to="/signup">Register now</Link>
                </Typography>
            </Paper>
        </Container>
    );
};

export default LoginComponent;
