import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";
import makeStyles from '@mui/material';

import {
    Avatar,
    Box,
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";

    interface User {
        username: string;
        password: string;
        first_name: string;
        last_name: string;
    }
    
    const LoginForm: React.FC = () => {
        const [user, setUser] = useState<User>({
            username: '',
            password: '',
            first_name: '',
            last_name: ''
        });
        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setUser({
              ...user,
              [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = async (e: React.FormEvent) => {
            e.preventDefault();
            try {
              const response = await axios.post('http://localhost:8000/api/register', user);
              if (response.status === 200) {
                alert('User created successfully');
                setUser({ username: '', password: '', first_name: '', last_name: '' });
              }
            } catch (error) {
              console.error('Error creating user:', error);
              alert('Failed to create user');
            }
        };

        return (
            <>
            <Container maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        mt: 20,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                <Avatar sx={{ m: 1, bgcolor: "primary.light" }}>
                    <LockOutlined />
                </Avatar>
                <Typography variant="h5">Register</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="username"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                value={user.username}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="password"
                                required
                                fullWidth
                                id="password"
                                label="Password"
                                value={user.password}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="first_name"
                                required
                                fullWidth
                                id="first_name"
                                label="Name"
                                value={user.first_name}
                                onChange={handleChange} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                name="last_name"
                                required
                                fullWidth
                                id="last_name"
                                label="Lastname"
                                value={user.last_name}
                                onChange={handleChange} />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Register
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/">Already have an account?</Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </>
        );
    };

    

export default LoginForm;

