import { Request, Response } from 'express';
import Message, { IMessage } from '../models/messsagesModel';
import TelegramBot from 'node-telegram-bot-api';

export const getMessages = async (req: Request, res: Response): Promise<void> => {
  try {
    const messages: IMessage[] = await Message.find();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const postMessage = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sender, text } = req.body;
    const newMessage = new Message({ sender, text });
    const savedMessage: IMessage = await newMessage.save();
    res.json(savedMessage);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};