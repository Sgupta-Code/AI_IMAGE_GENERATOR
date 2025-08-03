// models/Image.js
const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prompt: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
  },
  taskId:{
    type: String,
    required: true
  },
  status:{
    type: String,
    default: 'CREATED'
  },
  
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Image', ImageSchema);