import express from 'express';
import http from "http";
import bodyParser from 'body-parser';
// import cookieParser from 'cookie-parser'  
// import compression from 'compression';
// import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import messageRoutes from './src/routes/messagesRoutes';
import TelegramBot from 'node-telegram-bot-api';

dotenv.config();
const app = express();

const port = process.env.PORT || 3000;

if (!process.env.TOKEN) {
  throw new Error('MONGO_URL environment variable is not defined.');
}

if (!process.env.MONGO_URL) {
  throw new Error('MONGO_URL environment variable is not defined.');
}
const TOKEN = process.env.TOKEN;

const bot = new TelegramBot(TOKEN, {polling: true});






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


bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
console.log(msg);
  // You can handle the incoming message here, and if needed, save it to your database.
  console.log(`Received message from chat ID ${chatId}: "${messageText}"`);

  // For example, you can send a reply back to the user
  bot.sendMessage(chatId, 'Received your message: ' + messageText);
});