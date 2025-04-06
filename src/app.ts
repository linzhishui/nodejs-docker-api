import express, { Application } from 'express';
import axios from 'axios';
import cors from 'cors';
import nameRoutes from './routes/nameRoutes';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());

// 挂载路由
app.use('/api/names', nameRoutes);

// 健康检查接口
app.get('/health', (req, res) => {
  res.json({ status: 'UP', timestamp: new Date() });
});

// 调用外部API的接口示例
app.get('/api/external', async (req, res) => {
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    res.json({ data: response.data });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
});

// 启动服务
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
