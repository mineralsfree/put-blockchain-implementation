import React, {useState} from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    // console.log(a);
    // console.log(props);
    const navigate = useNavigate();
    // const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };
    const handleRegister = () => {
        navigate('/register');
    };
    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/user/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email: username, password}),
            });

            if (response.ok) {
                const data = await response.json();
                // Assuming the server returns a token or user object upon successful authentication
                // Modify the login function in the AuthProvider to store the user data or token
                localStorage.setItem('jwt', data.userToken);
                if (data.userToken) {
                    axios.defaults.headers.common.Authorization = `Bearer ${data.userToken}`;
                }
                // window.location.reload();
                navigate('/dashboard/blockchain');
            } else {
                // Handle authentication error, e.g., display an error message
                console.log('Authentication failed');
            }
        } catch (error) {
        }
    }
    return (
        <Container maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '64px',
        }}>
            <Typography variant="h5" component="h1" sx={{marginBottom: '32px'}}>
                Logowanie
            </Typography>
            <TextField
                label="Email"
                variant="outlined"
                fullWidth
                sx={{marginBottom: '16px'}}
                value={username}
                onChange={handleEmailChange}
            />
            <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                sx={{marginBottom: '16px'}}
                value={password}
                onChange={handlePasswordChange}
            />
            <Button
                sx={{marginBottom: '32px'}}
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleLogin}
            >
                Zaloguj się
            </Button>
            <Typography variant="body1" sx={{marginTop: 2}}>
                Nie masz jeszcze konta?{' '}
                <Link to={'/register'}>
                    Zarejestruj się tutaj
                </Link>
            </Typography>
        </Container>
    );
};

export default LoginPage;
