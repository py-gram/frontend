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
        first_name: string;
        last_name: string;
        age: string;
    }
    
    const LoginForm: React.FC = () => {
        const [user, setUser] = useState<User>({
            first_name: '',
            last_name: '',
            age: ''
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
                setUser({ first_name: '', last_name: '', age: '' });
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
                        <Grid item xs={12}>
                            <TextField
                                name="age"
                                required
                                fullWidth
                                id="age"
                                label="Age"
                                value={user.age}
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
                            <Link to="/login">Already have an account?</Link>
                        </Grid>
                    </Grid>
                </Box>
                </Box>
            </Container>
        </>
        );
    };

    

export default LoginForm;

