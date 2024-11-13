import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { Course } from "./courseType";
import courseModel from "./courseModel";
import { AuthRequest } from "../middlewares/authenticate";
import { User } from "../user/userTypes";
import userModel from "../user/userModel";
import instructorModel from "../instructor/instructorModel";
import mongoose, { ObjectId } from "mongoose";
import { Instructor } from "../instructor/instructorType";

const createCourse = async (req: Request, res: Response, next: NextFunction) => {
    const { name, description, price, tags, instructors, discount,
        couponCode, rating,
        reviews,
        students,
        details,
        modules } = req.body

    if(!name || !description || !price || !tags || !instructors) {
        return next(createHttpError(400, "All field required."))
    }

    const _req = req as AuthRequest;

    let userData: User | null
    const userId = _req.userId
    try {
        userData = await userModel.findOne({_id: userId});
        if(!userData?.isInstructor && !userData?.instructorId) {
            return next(createHttpError(400, "User is not instructor."))
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting user."))
    }


    let newCourse: Course | null
    try {
        newCourse = await courseModel.create({
            name,
            description,
            price,
            discount,
            couponCode,
            tags,
            instructors,
            rating,
            reviews,
            students,
            details,
            modules
        })
        if(newCourse) {
            const objectIds = instructors.map((id: string) => new mongoose.Types.ObjectId(id));
            const courseId: ObjectId | undefined = newCourse._id
            const updateInstructor = await instructorModel.updateMany(
                { _id: { $in: objectIds}},
                {
                    $addToSet: { courses: courseId}
                }
            )

            if(updateInstructor) {
                res.status(201).json({ course: newCourse})
            }

            
        }
    } catch (error) {
        return next(createHttpError(500, "Error while create course."))
    }
}

const updateCourse = async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;    
    const { instructorId, ...data} = req.body;

    let instructorData: Instructor | null;
    try {
        instructorData = await instructorModel.findOne({ _id : instructorId });
        if(!instructorData) {
            return next(createHttpError(400, "instructor not found."))
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting instructor."))
    }
    const isCourseExist = instructorData?.courses.find((course) =>
        course.toString() === courseId.toString() 
    );

    if(!isCourseExist) {
        return next(createHttpError(500, "Course not exist for this instructor."))
    }
    if(!courseId) {
        return next(createHttpError(404, "CourseId not found."))
    }
    let updatedCourse: Course | null;
    try {
        updatedCourse = await courseModel.findByIdAndUpdate(
            
            { _id : courseId },
            data
            ,
            {new : true}
            
        )

        if(updatedCourse) {
            res.status(201).json({ updatedCourse }) 
        }
    } catch (error) {
        return next(createHttpError(500, "Error while update course."))
    }
}

const getAllCourse = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const allCourses = await courseModel.find();
        res.status(200).json({courses: allCourses})
    } catch (error) {
        return next(createHttpError(500, "Error while getting courses."))
    }
}

const getCourseDetail = async(req:Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    let courseDetail: Course | null;
    try {
        courseDetail = await courseModel.findOne({ _id : courseId });
        if(!courseDetail) {
            return next(createHttpError(400, "Course not found."))
        }

        res.status(200).json({ course: courseDetail })
    } catch (error) {
        return next(createHttpError(500, "Error while getting course."))
    }
}

const deleteCourse = async (req: Request, res: Response, next: NextFunction) => {
    const courseId = req.params.courseId;

    const _req = req as AuthRequest;
    console.log("_req", _req.userId)
    let userData: User | null;
    try {
        userData = await userModel.findOne({ _id : _req.userId })

        if(!userData) {
            return next(createHttpError(400, "User not found."))
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting user."))
    }

    if(!userData?.instructorId || !userData?.isInstructor) {
        return next(createHttpError(400, "User is not instructor."))
    }

    let instructorData: Instructor | null
    try {
        instructorData = await instructorModel.findOne({ _id : userData?.instructorId });

        if(!instructorData) {
            return next(createHttpError(400, "Instructro details not found."))
        } 
    } catch (error) {
        return next(createHttpError(500, "Error while getting instructor."))
    }

    const isCourseExist = instructorData?.courses.find((course) =>
        course.toString() === courseId.toString() 
    );

    if(!isCourseExist) {
        return next(createHttpError(500, "Course not exist for this instructor."))
    }

    let courseData: Course | null;
    try {
        courseData = await courseModel.findByIdAndDelete({ _id : courseId });

    } catch (error) {
        return next(createHttpError(500, "Error while delete course."))
    }

    try {
        await instructorModel.updateMany(
            {_id : { $in: courseData?.instructors}},
            {
                $pull : { courses: courseId }
            }
        )
    } catch (error) {
        return next(createHttpError(500, "Error while delete course from instructor.")) 
    }

    res.status(200).json({ message: "Course deleted successfully."})
}



export {
    createCourse,
    updateCourse,
    getAllCourse,
    getCourseDetail,
    deleteCourse
}