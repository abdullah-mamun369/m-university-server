import { Schema, model, connect } from 'mongoose';
import {
  Guardian,
  LocalGuardian,
  Student,
  UserName,
} from './student.interface';

const userNameSchema = new Schema<UserName>({
  firstname: { String, require: true },
  middlename: { String },
  lastname: { String, require: true },
});

const guardianSchema = new Schema<Guardian>({
  fatherName: { String, require: true },
  fatherOccupation: { String, require: true },
  fatherContactNo: { String, require: true },
  motherName: { String, require: true },
  motherOccupation: { String, require: true },
  motherContactNo: { String, require: true },
});

const localGuardianSchema = new Schema<LocalGuardian>({
  name: { String, require: true },
  occupation: { String, require: true },
  contactNo: { String, require: true },
  address: { String, require: true },
});

const studentSchema = new Schema<Student>({
  id: { type: String },
  name: userNameSchema,
  gender: ['male', 'female'],
  dateOfBirth: { type: String },
  email: { type: String, require: true },
  contactNo: { type: String, require: true },
  emergyncyContactNo: { type: String, require: true },
  bloodGroup: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
  presentAddress: { type: String, require: true },
  permanentAddress: { type: String, require: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: ['active', 'blocked'],
});

const Student = model<Student>('Student', studentSchema);
