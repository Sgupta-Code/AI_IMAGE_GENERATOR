// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button, Box, Paper } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          AI Image Generator
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom color="textSecondary">
          Create stunning AI-generated images with just a text prompt
        </Typography>
        <Box sx={{ mt: 4 }}>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            to="/register" 
            size="large" 
            sx={{ mr: 2 }}
          >
            Get Started
          </Button>
          <Button 
            variant="outlined" 
            color="primary" 
            component={Link} 
            to="/login" 
            size="large"
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Home;