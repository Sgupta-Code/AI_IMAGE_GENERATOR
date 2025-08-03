// src/pages/Register.js
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: ''
  });
  const { username, email, password, password2 } = formData;
  
  const [localError, setLocalError] = useState(null);
  const { register, isAuthenticated, error, clearError } = useContext(AuthContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);
  
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const onSubmit = e => {
    e.preventDefault();
    if (password !== password2) {
      setLocalError('Passwords do not match');
    } else {
      setLocalError(null);
      register({ username, email, password });
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4, mb: 2 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Register
        </Typography>
        <Typography variant="body1" align="center" color="textSecondary" paragraph>
          Create your account
        </Typography>
      </Box>
      
      {(error || localError) && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => {
          clearError();
          setLocalError(null);
        }}>
          {error || localError}
        </Alert>
      )}
      
      <Box component="form" onSubmit={onSubmit} noValidate>
        <TextField
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          value={email}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          value={password}
          onChange={onChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password2"
          label="Confirm Password"
          type="password"
          id="password2"
          value={password2}
          onChange={onChange}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 3, mb: 2 }}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
};

export default Register;