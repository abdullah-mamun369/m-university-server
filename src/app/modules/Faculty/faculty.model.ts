import { Schema, model } from 'mongoose';
import { FacultyModel, TFaculty, TUserName } from './faculty.interface';
import { BloodGroup, Gender } from './faculty.constant';

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

//By Static method
const facultySchema = new Schema<TFaculty, FacultyModel>(
  {
    id: {
      type: String,
      required: [true, 'ID is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    designation: {
      type: String,
      required: [true, 'Designation is required'],
    },
    name: {
      type: userNameSchema,
      required: [true, 'Name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
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
        values: BloodGroup,
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
    profileImg: { type: String, default: '' },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      ref: 'AcademicDepartment',
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      required: [true, 'Acadcemic Faculty is required'],
      ref: 'AcademicFaculty',
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
facultySchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

//Query middleware for skip the delete data, find method
facultySchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Query middleware for skip the delete data, findOne method
facultySchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

//Query middleware for skip the delete data, aggregation method
facultySchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//Creating a custom static
facultySchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Faculty.findOne({ id });
  return existingUser;
};

export const Faculty = model<TFaculty, FacultyModel>('Faculty', facultySchema);
