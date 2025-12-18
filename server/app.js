import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from "morgan";

import { connectDB } from './config/db.js';
import userRoute from './routes/userRoutes.js'
import chatRoute from './routes/chatRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/api/auth', userRoute)
app.use('/api/chat', chatRoute);

app.get('/', (req, res) => {
  res.send('Welcome to the Chat App Server!');
});

app.use(notFound);
app.use(errorHandler)

// Start Server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`❌ Error starting server:`, err);
    process.exit(1);
  }
  console.log(`✅ Server running at http://localhost:${PORT}`);
});

export default app;
