// src/pages/ImageHistory.js
import React, { useContext, useEffect, useState } from 'react';
import { ImageContext } from '../context/ImageContext';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  IconButton, 
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  Alert,
  CircularProgress
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageHistory = () => {
  const { images, getImages, deleteImage, loading, error } = useContext(ImageContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  
  useEffect(() => {
    getImages();
    // eslint-disable-next-line
  }, []);
  
  const handleOpenImage = (image) => {
    setSelectedImage(image);
    setOpenDialog(true);
  };
  
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  
  const handleDeleteConfirm = (id) => {
    setDeleteId(id);
  };
  
  const confirmDelete = async () => {
    await deleteImage(deleteId);
    setDeleteId(null);
  };
  
  const cancelDelete = () => {
    setDeleteId(null);
  };
  
  if (loading) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Your Image History
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {images.length === 0 ? (
        <Box sx={{ mt: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="textSecondary">
            You haven't generated any images yet.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {images.map(image => (
            <Grid item xs={12} sm={6} md={4} key={image._id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={image.imageUrl}
                  alt={image.prompt}
                  onClick={() => handleOpenImage(image)}
                  sx={{ cursor: 'pointer', objectFit: 'cover' }}
                />
                <CardContent sx={{ pb: 1 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <Typography variant="body2" color="textSecondary" sx={{ maxWidth: '80%' }} noWrap>
                      {image.prompt}
                    </Typography>
                    <IconButton 
                      size="small" 
                      color="error" 
                      onClick={() => handleDeleteConfirm(image._id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Typography variant="caption" color="textSecondary">
                    {new Date(image.createdAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      
      {/* Image Preview Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        {selectedImage && (
          <>
            <DialogTitle>
              {new Date(selectedImage.createdAt).toLocaleString()}
            </DialogTitle>
            <DialogContent>
              <CardMedia
                component="img"
                image={selectedImage.imageUrl}
                alt={selectedImage.prompt}
                sx={{ width: '100%', maxHeight: '70vh', objectFit: 'contain' }}
              />
              <Typography variant="body1" sx={{ mt: 2 }}>
                {selectedImage.prompt}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteId !== null} onClose={cancelDelete}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this image?</Typography>
          <Typography variant="body2" color="textSecondary">This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete}>Cancel</Button>
          <Button onClick={confirmDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ImageHistory;