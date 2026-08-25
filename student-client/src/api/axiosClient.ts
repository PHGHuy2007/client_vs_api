import axios from 'axios';

// Khởi tạo một Axios Instance duy nhất dùng chung toàn ứng dụng
const axiosClient = axios.create({
  baseURL: 'http://127.0.0.1:3000/api/v1', // URL gốc của Backend API
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // Tự động hủy Request nếu Server không phản hồi sau 10s
});

// Response Interceptor: Xử lý dữ liệu và lỗi tập trung trước khi trả về cho UI
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về trực tiếp phần body (data) của HTTP Response
    return response.data;
  },
  (error) => {
    // Trích xuất thông điệp lỗi chuẩn từ ApiResponse nếu Backend trả về lỗi Status 4xx/5xx
    const errorMessage =
      error.response?.data?.message || 'Không thể kết nối đến máy chủ.';
    return Promise.reject(new Error(errorMessage));
  }
);

export default axiosClient;
