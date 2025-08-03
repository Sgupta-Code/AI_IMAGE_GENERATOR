// src/context/ImageContext.js
import React, { createContext, useReducer } from 'react';
import api from '../utils/api'; // Import the API utility

// Create context
export const ImageContext = createContext();

// Initial state
const initialState = {
  images: [],
  currentImage: null,
  loading: false,
  error: null
};

// Reducer
function imageReducer(state, action) {
  switch (action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        images: action.payload,
        loading: false
      };
    case 'GENERATE_IMAGE':
      return {
        ...state,
        currentImage: action.payload,
        images: [action.payload, ...state.images],
        loading: false
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter(image => image._id !== action.payload),
        loading: false
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'IMAGE_ERROR':
      return {
        ...state,
        error: action.payload,
        loading: false
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}

// Provider component
export const ImageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(imageReducer, initialState);

  // Get all images
  const getImages = async () => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await api.get('/images');
      dispatch({ type: 'GET_IMAGES', payload: res.data });
    } catch (err) {
      dispatch({
        type: 'IMAGE_ERROR',
        payload: err.response?.data?.msg || 'Failed to fetch images'
      });
    }
  };

  // Generate new image
  const generateImage = async (prompt) => {
    try {
      dispatch({ type: 'SET_LOADING' });
      const res = await api.post('/images/generate', { prompt });
      const {image} = res.data;

      let status = image.status;
      let imageUrl = image.imageUrl;
      let attempts = 0;
      while(status !== "COMPLETED" && attempts< 10){
        await new Promise(resolve => setTimeout(resolve,3000));
        const statusRes = await api.get(`/images/status/${image.taskId}`);
        status = statusRes.data.status;
        imageUrl = statusRes.data.imageUrl || "";
        attempts++;
        if(status === "COMPLETED" && imageUrl) break;
      }

      const finalImage = {
        ...image, status, imageUrl
      };

      dispatch({ type: 'GENERATE_IMAGE', payload: finalImage });
      return finalImage;
    } catch (err) {
      dispatch({
        type: 'IMAGE_ERROR',
        payload: err.response?.data?.msg || 'Failed to generate image'
      });
      return null;
    }
  };

  // Delete image
  const deleteImage = async (id) => {
    try {
      await api.delete(`/images/${id}`);
      dispatch({ type: 'DELETE_IMAGE', payload: id });
    } catch (err) {
      dispatch({
        type: 'IMAGE_ERROR',
        payload: err.response?.data?.msg || 'Failed to delete image'
      });
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  return (
    <ImageContext.Provider
      value={{
        images: state.images,
        currentImage: state.currentImage,
        loading: state.loading,
        error: state.error,
        getImages,
        generateImage,
        deleteImage,
        clearError
      }}
    >
      {children}
    </ImageContext.Provider>
  );
};