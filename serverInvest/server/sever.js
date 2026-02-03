import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAICompletion } from './services/aiService.js';

dotenv.config();

const app = express();


app.use(cors({ origin: 'http://localhost:5173' })); // я разрешил допступ только к своему фронту
app.use(express.json());

// эндпоинт для чата
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Сообщение не может быть пустым' });
  }

  try {
    const reply = await getAICompletion(message);
    res.json({ success: true, reply });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`
  Backend запущен на http://localhost:${PORT}
  `);
});