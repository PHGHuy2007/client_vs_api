// Interface định nghĩa đối tượng Student đồng bộ với Backend
export interface Student {
  rollNumber: string;
  email: string;
  fullName: string;
  phone: string;
}

// Interface định nghĩa khung Response nhận từ Backend
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data?: T;
  total?: number;
  errors?: any;
}
