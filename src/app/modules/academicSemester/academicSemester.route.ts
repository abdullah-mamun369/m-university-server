import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../miiddlewares/validateRequest';
import { AcademicSemesterValidations } from './academicSemester.validtion';

// import validateRequest from '../../miiddlewares/validateRequest';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(
    AcademicSemesterValidations.createAcdemicSemesterValidationSchema,
  ), //validation middleware, by high rank function we can send paramater.
  AcademicSemesterControllers.createAcademicSemester,
);

export const AcademicSemisterRoutes = router;
