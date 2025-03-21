// routes/images.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const auth = require('../middleware/auth');
const Image = require('../models/Image');

// Generate image
router.post('/generate', auth, async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ msg: 'Prompt is required' });
    }
    
    // Call to Hugging Face Inference API for Stable Diffusion
    const response = await axios({
      method: 'post',
      url: 'https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5',
      headers: {
        'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      data: {
        inputs: prompt,
        parameters: {
          num_inference_steps: 50,
          guidance_scale: 7.5
        }
      },
      responseType: 'arraybuffer'
    });
    
    // Convert binary response to base64 for storing/displaying
    const base64Image = Buffer.from(response.data).toString('base64');
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    
    // Save the generated image to the database
    const newImage = new Image({
      userId: req.user.id,
      prompt,
      imageUrl
    });
    
    await newImage.save();
    
    res.json(newImage);
  } catch (err) {
    console.error('Error generating image:', err);
    
    // Check for specific Hugging Face API errors
    if (err.response) {
      if (err.response.status === 503) {
        return res.status(503).json({ 
          msg: 'The model is currently loading. Please try again in a moment.' 
        });
      } else if (err.response.status === 429) {
        return res.status(429).json({ 
          msg: 'Rate limit exceeded. Please try again later.' 
        });
      }
    }
    
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
});

// Get all images for current user
router.get('/', auth, async (req, res) => {
  try {
    const images = await Image.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(images);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Delete an image
router.delete('/:id', auth, async (req, res) => {
  try {
    const image = await Image.findById(req.params.id);
    
    // Check if image exists
    if (!image) {
      return res.status(404).json({ msg: 'Image not found' });
    }
    
    // Check if user owns the image
    if (image.userId.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await image.remove();
    
    res.json({ msg: 'Image removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;