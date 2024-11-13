import express from "express"
import { createCourse, deleteCourse, getAllCourse, getCourseDetail, updateCourse } from "./courseController";
import authenticate from "../middlewares/authenticate";

const courseRouter = express.Router();

courseRouter.post('/createCourse', authenticate, createCourse)
courseRouter.patch('/updateCourse/:courseId', authenticate, updateCourse)
courseRouter.get('/courses', getAllCourse)
courseRouter.get('/courseDetail/:courseId', getCourseDetail)
courseRouter.delete('/:courseId',authenticate, deleteCourse)

export default courseRouter;