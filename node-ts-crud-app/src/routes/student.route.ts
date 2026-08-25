import { Router } from 'express';
import { StudentController } from '../controllers/student.controller';
import { StudentService } from '../services/student.service';
// 1. Đổi import sang MySQL
import { MySqlStudentRepository } from '../repositories/mysql-student.repository';

const studentRouter = Router();

// 2. Thay đổi duy nhất dòng khởi tạo Repository này:
const repository = new MySqlStudentRepository();

// 3. Các tầng Service và Controller hoàn toàn giữ nguyên, không cần chạm tới
const studentService = new StudentService(repository);
const studentController = new StudentController(studentService);

studentRouter.post('/', studentController.createStudent);
studentRouter.get('/', studentController.getAllStudents);

export default studentRouter;