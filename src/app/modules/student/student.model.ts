import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import {
  // StudentMethods,
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from './student.interface';
import config from '../../config';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: { type: String, trim: true },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, 'Father name is required'],
    trim: true,
  },
  fatherOccupation: {
    type: String,
    required: [true, 'Father Occupation is required'],
    trim: true,
  },
  fatherContactNo: {
    type: String,
    required: [true, 'Father contact is required'],
  },
  motherName: { type: String, required: [true, 'Mother name is required'] },
  motherOccupation: {
    type: String,
    required: [true, 'Mother Occupation is required'],
  },
  motherContactNo: {
    type: String,
    required: [true, 'Mother Contact is required'],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, 'Local Guardian name is required'] },
  occupation: {
    type: String,
    required: [true, 'Local Guardian occupation is required'],
  },
  contactNo: {
    type: String,
    required: [true, 'Local Guardian contact is required'],
  },
  address: {
    type: String,
    required: [true, 'Local Guardian address is required'],
  },
});

//By Static method
const studentSchema = new Schema<TStudent, StudentModel>(
  {
    id: { type: String },
    password: {
      type: String,
      required: [true, 'Password is required'],
      maxlength: [20, 'Password can not be more than 20 characters'],
    },
    name: { type: userNameSchema, required: [true, 'Name is required'] },
    gender: {
      type: String,
      enum: {
        values: ['male', 'female', 'other'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: String },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
      type: String,
      required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Guardian information is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    isActive: {
      type: String,
      enum: {
        values: ['active', 'blocked'],
        message: '{VALUE} is not a valid status',
      },
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//Use Virtual for getting a data which is not exist in database but has some portion in the database like name has three portion.
studentSchema.virtual('fullName').get(function () {
  return `${this.name.firstName} ${this.name.middleName} ${this.name.lastName}`;
});

//pre middleware for hasing data
studentSchema.pre('save', async function (next) {
  // Store hash in your password DB.
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//post middleware for sending data without hashing data
studentSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

//Query middleware for skip the delete data, find method
studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Query middleware for skip the delete data, findOne method
studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Query middleware for skip the delete data, aggregation method
studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Creating a custom static
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

// //By creating a custom instance method
// const studentSchema = new Schema<TStudent, StudentModel, StudentMethods>({
//   id: { type: String },
//   password: {
//     type: String,
//     required: [true, 'Password is required'],
//     maxlength: [20, 'Password can not be more than 20 characters'],
//   },
//   name: { type: userNameSchema, required: [true, 'Name is required'] },
//   gender: {
//     type: String,
//     enum: {
//       values: ['male', 'female', 'other'],
//       message: '{VALUE} is not a valid gender',
//     },
//     required: [true, 'Gender is required'],
//   },
//   dateOfBirth: { type: String },
//   email: {
//     type: String,
//     required: [true, 'Email is required'],
//     unique: true,
//   },
//   contactNo: { type: String, required: [true, 'Contact number is required'] },
//   emergencyContactNo: {
//     type: String,
//     required: [true, 'Emergency contact number is required'],
//   },
//   bloodGroup: {
//     type: String,
//     enum: {
//       values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
//       message: '{VALUE} is not a valid blood group',
//     },
//   },
//   presentAddress: {
//     type: String,
//     required: [true, 'Present address is required'],
//   },
//   permanentAddress: {
//     type: String,
//     required: [true, 'Permanent address is required'],
//   },
//   guardian: {
//     type: guardianSchema,
//     required: [true, 'Guardian information is required'],
//   },
//   localGuardian: {
//     type: localGuardianSchema,
//     required: [true, 'Local guardian information is required'],
//   },
//   profileImg: { type: String },
//   isActive: {
//     type: String,
//     enum: {
//       values: ['active', 'blocked'],
//       message: '{VALUE} is not a valid status',
//     },
//     default: 'active',
//   },
//   isDeleted: {
//     type: Boolean,
//     default: false,
//   },
// });

// //By creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };

export const Student = model<TStudent, StudentModel>('Student', studentSchema);