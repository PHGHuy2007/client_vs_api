import express, { Application } from 'express';
import cors, { CorsOptions } from 'cors';
import dotenv from 'dotenv';
import studentRouter from './routes/student.route';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// CẤU HÌNH BẢO MẬT CORS
// Khai báo danh sách các Origin được phép gửi Request tới Server này
const allowedOrigins = [
  'http://localhost:5173', // Địa chỉ mặc định của Client Vite/React
  'http://localhost:3000'  // Địa chỉ nội bộ
];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Cho phép các Request không có Origin (như Postman hoặc Server-to-Server)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('CORS Policy: Access denied from this Origin.'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Các HTTP Method được phép
  allowedHeaders: ['Content-Type', 'Authorization'],    // Các Header được phép gửi lên
  credentials: true // Cho phép gửi kèm Cookie/Authorization Header nếu cần
};

// Đăng ký Middleware CORS toàn cục
app.use(cors());

// Middlewares xử lý dữ liệu đầu vào
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Đăng ký Định tuyến (Routes)
app.use('/api/v1/students', studentRouter);

app.listen(PORT, () => {
  console.log(`[Backend] Server running at: http://localhost:${PORT}`);
});
