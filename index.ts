import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser'  
// import compression from 'compression';
// import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import messageRoutes from './src/routes/messagesRoutes';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL environment variable is not defined.');
}

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });


// Middleware setup
app.use(express.json());

// Use message routes
app.use('/api', messageRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});