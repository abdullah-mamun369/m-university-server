import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../miiddlewares/validateRequest';
import { createStudentValidationSchema } from '../student/student.validation';

const router = express.Router();

router.post(
  '/create-student',
  validateRequest(createStudentValidationSchema), //validation middleware, by high rank function we can send paramater.
  UserControllers.createStudent,
);

export const UserRoutes = router;
