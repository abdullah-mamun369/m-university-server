import { Student } from './student.model';
import { TStudent } from './student.interface';

const createStudentIntoDB = async (studentData: TStudent) => {
  // //Mongoose built in static method to create a data in the database.
  // const result = await Student.create(studentData);

  if (await Student.isUserExists(studentData.id)) {
    throw new Error('User already exist');
  }

  const result = await Student.create(studentData);

  // //Mongoose built in instance method to create a data in the database.
  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exist');
  // }
  // const result = await student.save();

  return result;
};

const getAllStudentsFromBD = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromBD = async (id: string) => {
  // //Find one method
  // const result = await Student.findOne({ id });

  //aggregation method
  const result = await Student.aggregate([{ $match: { id: id } }]);

  return result;
};

const deleteStudentFromBD = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromBD,
  getSingleStudentFromBD,
  deleteStudentFromBD,
};
