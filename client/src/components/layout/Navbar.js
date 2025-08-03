// src/components/layout/Navbar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { AppBar, Box, Toolbar, Typography, Button } from '@mui/material';

const Navbar = () => {
  const { isAuthenticated, logout, user } = useContext(AuthContext);

  const authLinks = (
    <>
      <Button color="inherit" component={Link} to="/dashboard">
        Dashboard
      </Button>
      <Button color="inherit" component={Link} to="/generate">
        Generate Image
      </Button>
      <Button color="inherit" component={Link} to="/history">
        Image History
      </Button>
      <Button color="inherit" onClick={logout}>
        Logout
      </Button>
    </>
  );

  const guestLinks = (
    <>
      <Button color="inherit" component={Link} to="/login">
        Login
      </Button>
      <Button color="inherit" component={Link} to="/register">
        Register
      </Button>
    </>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'white' }}>
            AI Image Generator
          </Typography>
          {isAuthenticated ? authLinks : guestLinks}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;