// src/pages/Dashboard.js
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { ImageContext } from '../context/ImageContext';
import { Container, Typography, Box, Grid, Button, Card, CardContent } from '@mui/material';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { images, getImages } = useContext(ImageContext);
  
  useEffect(() => {
    getImages();
    // eslint-disable-next-line
  }, []);
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" paragraph>
          Welcome back, {user?.username}!
        </Typography>
      </Box>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Generate New Images
              </Typography>
              <Typography variant="body1" paragraph>
                Create AI-generated images using text prompts. Be creative and explore the possibilities!
              </Typography>
              <Button 
                variant="contained" 
                color="primary" 
                component={Link} 
                to="/generate"
              >
                Generate Images
              </Button>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Image History
              </Typography>
              <Typography variant="body1" paragraph>
                You've generated {images.length} images so far. View your previous creations.
              </Typography>
              <Button 
                variant="contained" 
                color="secondary" 
                component={Link} 
                to="/history"
              >
                View History
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {images.length > 0 && (
        <Box sx={{ mt: 6 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            Recent Images
          </Typography>
          <Grid container spacing={3}>
            {images.slice(0, 3).map(image => (
              <Grid item xs={12} sm={6} md={4} key={image._id}>
                <Card>
                  <Box 
                    sx={{ 
                      height: 200, 
                      backgroundImage: `url(${image.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }} 
                  />
                  <CardContent>
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {image.prompt}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          {images.length > 3 && (
            <Box sx={{ mt: 2, textAlign: 'center' }}>
              <Button 
                variant="outlined" 
                component={Link} 
                to="/history"
              >
                View All Images
              </Button>
            </Box>
          )}
        </Box>
      )}
    </Container>
  );
};

export default Dashboard;