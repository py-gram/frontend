import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { tokenToString } from 'typescript';
//import * as Reacts from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
//import { Cookie } from '@mui/icons-material';


const Homepage = () => {
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/logout', { withCredentials: true});
      if (response.status === 200) {
        alert('User logged out successfully');

        navigate('/')
    }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login error.');
    }
};

  useEffect(() => {
    // Fetch user data from backend
    const fetchUserData = async () => {
      try {
        //const token = JSON.parse(localStorage.getItem('token') as string);
        
        //console.debug('token', token)
        const response = await axios.get('http://localhost:8000/api/user', {withCredentials: true} );
        // Set user data in state
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);
  

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            User
          </Typography>
          <Button color="inherit"
            onClick={handleLogout}>
            Logout</Button>
        </Toolbar>
      </AppBar>
      <Container fixed sx={{ mt: 10 }}>
        <Box>
          <div>
            <h2>Welcome to the Py-gram</h2>
            {userData ? (
              <div>
                <p>Response: {JSON.stringify(userData)}</p>
              </div>
            ) : (
              <p>Loading user data...</p>
            )}
          </div>
        </Box>
      </Container>
    </Box>
  );
};

export default Homepage;