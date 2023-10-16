import express, { Router, Request, Response } from "express";

import { getMessages, postMessage } from "../controllers/messageController";

const router = Router();

router.get('/messages', getMessages);

router.post('/messages',postMessage);

export default router;