import dbPool from '../config/database'; 
import { Student } from '../models/student.model';
import { StudentRepositoryInterface } from './student.repository.interface';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
export class MySqlStudentRepository implements StudentRepositoryInterface {
  public async create(s: Student): Promise<Student> {
    await dbPool.execute<ResultSetHeader>(
      `INSERT INTO students (roll_number, email, full_name, phone) VALUES (?, ?, ?, ?)`,
      [s.rollNumber, s.email, s.fullName, s.phone]
    );
    return s;
  }
  public async findAll(): Promise<Student[]> {
    const [rows] = await dbPool.query<RowDataPacket[]>(`SELECT roll_number AS rollNumber, email, full_name AS fullName, phone FROM students`);
    return rows as Student[];
  }
  public async findByEmail(email: string): Promise<Student | null> {
    const [rows] = await dbPool.query<RowDataPacket[]>(`SELECT roll_number AS rollNumber, email, full_name AS fullName, phone FROM students WHERE email = ?`, [email]);
    return rows.length ? rows[0] as Student : null;
  }
  public async update(rollNumber: string, data: Partial<Student>): Promise<boolean> {
    const [res] = await dbPool.execute<ResultSetHeader>(
      `UPDATE students SET email = ?, full_name = ?, phone = ? WHERE roll_number = ?`,
      [data.email, data.fullName, data.phone, rollNumber] as any[]
    );
    return res.affectedRows > 0;
}
  public async delete(rollNumber: string): Promise<boolean> {
    const [res] = await dbPool.execute<ResultSetHeader>(`DELETE FROM students WHERE roll_number = ?`, [rollNumber]);
    return res.affectedRows > 0;
  }
}