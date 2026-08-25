import { Collection, Document } from 'mongodb';
import { getMongoDb } from '../config/mongo';
import { Student } from '../models/student.model';
import { StudentRepositoryInterface } from './student.repository.interface';

interface StudentDoc extends Document {
  _id: string; email: string; fullName: string; phone: string;
}

export class MongoStudentRepository implements StudentRepositoryInterface {
  private async getCol(): Promise<Collection<StudentDoc>> {
    const db = await getMongoDb();
    return db.collection<StudentDoc>('students');
  }
  public async create(s: Student): Promise<Student> {
    const col = await this.getCol();
    await col.insertOne({ _id: s.rollNumber, email: s.email, fullName: s.fullName, phone: s.phone });
    return s;
  }
  public async findAll(): Promise<Student[]> {
    const docs = await (await this.getCol()).find().toArray();
    return docs.map(d => new Student(d._id, d.email, d.fullName, d.phone));
  }
  public async findByEmail(email: string): Promise<Student | null> {
    const doc = await (await this.getCol()).findOne({ email });
    return doc ? new Student(doc._id, doc.email, doc.fullName, doc.phone) : null;
  }
  public async update(rollNumber: string, data: Partial<Student>): Promise<boolean> {
    const res = await (await this.getCol()).updateOne({ _id: rollNumber }, { $set: data });
    return res.modifiedCount > 0;
  }
  public async delete(rollNumber: string): Promise<boolean> {
    const res = await (await this.getCol()).deleteOne({ _id: rollNumber });
    return res.deletedCount > 0;
  }
}