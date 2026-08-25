import { Student } from '../models/student.model';
import { StudentRepositoryInterface } from '../repositories/student.repository.interface';
export class StudentService {
  constructor(private repo: StudentRepositoryInterface) {}
  public async createStudent(data: Student): Promise<Student> {
    if (await this.repo.findByEmail(data.email)) throw new Error('Email đã tồn tại!');
    return await this.repo.create(data);
  }
  public async getAllStudents(): Promise<Student[]> {
    return await this.repo.findAll();
  }
  public async updateStudent(rollNumber: string, data: Partial<Student>) {
    return await this.repo.update(rollNumber, data);
  }
  public async deleteStudent(rollNumber: string) {
    return await this.repo.delete(rollNumber);
  }
}