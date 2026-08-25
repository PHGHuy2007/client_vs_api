import { Student } from '../models/student.model';
export interface StudentRepositoryInterface {
  create(student: Student): Promise<Student>;
  findAll(): Promise<Student[]>;
  findByEmail(email: string): Promise<Student | null>;
  update(rollNumber: string, data: Partial<Student>): Promise<boolean>;
  delete(rollNumber: string): Promise<boolean>;
}