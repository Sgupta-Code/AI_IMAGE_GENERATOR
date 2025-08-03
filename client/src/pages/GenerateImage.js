// src/pages/GenerateImage.js
import React, { useState, useContext } from 'react';
import { ImageContext } from '../context/ImageContext';
import { 
  Container, 
  Typography, 
  Box, 
  TextField, 
  Button, 
  CircularProgress, 
  Paper,
  Card,
  CardMedia,
  Alert,
  Snackbar
} from '@mui/material';

const GenerateImage = () => {
  const [prompt, setPrompt] = useState('');
  const [success, setSuccess] = useState(false);
  const { generateImage, currentImage, loading, error, clearError } = useContext(ImageContext);
  
  const onSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim() === '') return;
    
    const result = await generateImage(prompt);
    if (result) {
      setSuccess(true);
      setPrompt('');
    }
  };
  
  const handleCloseSnackbar = () => {
    setSuccess(false);
  };
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Generate AI Image
      </Typography>
      
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            fullWidth
            label="Enter your image prompt"
            placeholder="E.g., A surreal landscape with floating islands and a purple sky"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            disabled={loading}
            multiline
            rows={3}
            margin="normal"
            variant="outlined"
          />
          
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              disabled={loading || prompt.trim() === ''}
              sx={{ minWidth: 150 }}
            >
              {loading ? <CircularProgress size={24} /> : 'Generate'}
            </Button>
          </Box>
        </Box>
      </Paper>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={clearError}>
          {error}
        </Alert>
      )}
      
      {currentImage && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Generated Image
          </Typography>
          <Card>
            <CardMedia
              component="img"
              image={currentImage.imageUrl}
              alt={currentImage.prompt}
              sx={{ width: '100%', maxHeight: 500, objectFit: 'contain' }}
            />
            <Box sx={{ p: 2 }}>
              <Typography variant="body2" color="textSecondary">
                Prompt: {currentImage.prompt}
              </Typography>
            </Box>
          </Card>
        </Box>
      )}
      
      <Snackbar
        open={success}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="success">
          Image generated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default GenerateImage;