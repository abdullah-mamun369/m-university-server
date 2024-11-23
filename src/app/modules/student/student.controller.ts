import { Request, Response } from 'express';
import { StudentServices } from './student.service';
// import studentValidationSchema from './student.joi.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // //data validation with joi
    // const { error, value } = studentValidationSchema.validate(studentData);

    // //data validation with joi
    // const result = await StudentServices.createStudentIntoDB(value);

    const result = await StudentServices.createStudentIntoDB(studentData);

    // //data validation with joi
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something went wrong',
    //     data: error.details,
    //   });
    // }

    res.status(200).json({
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromBD();

    res.status(200).json({
      success: true,
      message: 'Students are retrived succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;

    const result = await StudentServices.getSingleStudentFromBD(studentId);

    res.status(200).json({
      success: true,
      message: 'Student is retrived succesfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      data: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
