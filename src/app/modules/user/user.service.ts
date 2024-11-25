import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given, deafult password will set
  userData.password = password || (config.default_password as string);

  //set the role strudent
  userData.role = 'student';

  //Manual user id
  userData.id = '20230100001';

  //create a user
  const newUser = await User.create(userData);

  //crete a student
  if (Object.keys(newUser).length) {
    studentData.id = newUser.id;
    studentData.user = newUser._id; //reference _id

    const newStudent = await Student.create(studentData);

    return newStudent;
  }

  return newUser;
};

export const UserService = {
  createStudentIntoDB,
};
