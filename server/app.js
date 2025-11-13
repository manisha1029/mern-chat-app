import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import {chats} from './data.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the Chat App Server!');
});

app.get('/api/chats', (req, res) => {
    res.send(chats)
})

app.get('/api/chats/:id', (req, res) => {
    const chat = chats.find((chat) => chat._id === req.params.id);
    res.send(chat)
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;