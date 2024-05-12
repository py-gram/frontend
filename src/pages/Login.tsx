import axios from 'axios';
import { useState } from 'react';
import { Link } from "react-router-dom";

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
        login: string;
        password: string;
    }
    
    const LoginForm: React.FC = () => {
        const [user, setUser] = useState<User>({
            login: '',
            password: ''
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
              const response = await axios.post('http://192.168.1.177:8000/api/users', user);
              if (response.status === 201) {
                alert('User created successfully');
                setUser({ login: '', password: ''});
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
                <Typography variant="h5">Login</Typography>
                <Box sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="login"
                                required
                                fullWidth
                                id="login"
                                label="Login"
                                value={user.login}
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
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        onClick={handleSubmit}
                    >
                        Login
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/register">Do not have account yet?</Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </>
        );
    };

    

export default LoginForm;

