# AI_IMAGE_GENERATOR

An advanced AI-powered image generator built using the MERN stack and Hugging Face's API. This project allows users to generate high-quality images from text prompts using cutting-edge AI models.

## 🌟 Project Overview

AI_IMAGE_GENERATOR is a full-stack web application that transforms text prompts into stunning AI-generated images. Leveraging the power of Hugging Face's Stable Diffusion models, users can create unique visual content with just a few words.

## ✨ Key Features

- 🎨 AI-Powered Image Generation
- 👤 Secure User Authentication
- 📦 Image Creation and Management
- 🗂️ Comprehensive Image History
- 📱 Responsive and Intuitive Design

## 🛠 Technology Stack

### Frontend
- React
- React Router
- Material-UI
- Axios

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

### AI Integration
- Hugging Face Inference API
- Stable Diffusion Model

## 🚀 Getting Started

### Prerequisites

- Node.js (v14.0.0+)
- npm (v6.0.0+)
- MongoDB
- Hugging Face API Key

### Installation Steps

1. Clone the Repository
```bash
git clone https://github.com/yourusername/AI_IMAGE_GENERATOR.git
cd AI_IMAGE_GENERATOR
```

2. Install Dependencies
```bash
# Backend Dependencies
cd backend
npm install

# Frontend Dependencies
cd ../frontend
npm install
```

## 🔧 Configuration

### Backend Environment Variables (`.env`)
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
HUGGINGFACE_API_KEY=your_hugging_face_api_key
PORT=5000
```

### Frontend Environment Variables (`.env`)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 🏃‍♂️ Running the Application

1. Start Backend Server
```bash
cd backend
npm start
```

2. Start Frontend Application
```bash
cd frontend
npm start
```

## 🌐 API Endpoints

### Authentication Endpoints
- `POST /api/users/register`: User Registration
- `POST /api/users/login`: User Authentication

### Image Management Endpoints
- `POST /api/images/generate`: Generate AI Image
- `GET /api/images`: Retrieve Image History
- `DELETE /api/images/:id`: Delete Specific Image

## 🔒 Security Measures

- Secure JWT Authentication
- Environment-based Credential Management
- Rate Limiting on Image Generation
- HTTPS Enforcement in Production

## 🤝 Contribution Guidelines

1. Fork the Repository
2. Create a Feature Branch
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit Your Changes
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. Push to the Branch
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request

## 📋 Project Structure

```
AI_IMAGE_GENERATOR/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── pages/
│       └── App.js
│
└── README.md
```

## 📦 Deployment

### Frontend Deployment
- Platforms: Netlify, Vercel, Heroku
- Build Command: `npm run build`

### Backend Deployment
- Recommended: Heroku, DigitalOcean, AWS

## 📄 License

Distributed under the MIT License.

## 📞 Contact

Satyam Gupta - shsatyam7417@gmail.com

Project Link: [https://github.com/yourusername/AI_IMAGE_GENERATOR](https://github.com/yourusername/AI_IMAGE_GENERATOR)

## 🙏 Acknowledgements

- Hugging Face
- React
- Node.js
- MongoDB
- Material-UI
