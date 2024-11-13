import { NextFunction, Request, Response } from "express";
import instructorModel from "./instructorModel";
import { AuthRequest } from "../middlewares/authenticate";
import createHttpError from "http-errors";
import { Instructor } from "./instructorType";
import userModel from "../user/userModel";

const createInstructor = async(req: Request, res: Response, next: NextFunction) => {

    const { description, aboutMe ,personalPortpholio, courses, socialMedias} = req.body;
    if(!description || !aboutMe || !personalPortpholio) {
        return next(createHttpError(400, "All fields required."))
    }

    const _req = req as AuthRequest;
    try {
        const userId = _req.userId
        const instructorData = await instructorModel.findOne({userId})

        if(instructorData) {
            return next(createHttpError(400, "Instructor already exist with this User."))
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting instructor."))
    }

    let newInstructor:Instructor
    try {
        newInstructor = await instructorModel.create({
            userId: _req.userId,
            description,
            aboutMe,
            courses,
            socialMedias,
            personalPortpholio,
        })

        if(newInstructor) {
            await userModel.findByIdAndUpdate(
                {_id: _req.userId},
                {
                    isInstructor: true,
                    instructorId: newInstructor?._id
                },
                {
                    new: true
                }
            )
            res.status(201).json({ instructor: newInstructor})
        }
    } catch (error) {
        return next(createHttpError(500, "Error while creating instructor."))
    }
}

const updateInstructor = async(req: Request, res: Response, next: NextFunction) => {
    const instructorId = req.params.instructorId;

    if(!instructorId) {
        return next(createHttpError(404, "InstructorId not found."))
    }

    let instructorData: Instructor | null;
    try {
        instructorData = await instructorModel.findOne({_id : instructorId});
        if(!instructorData) {
            return next(createHttpError(500, "Instructor not found."))
        }
    } catch (error) {
        return next(createHttpError(500, "Error while getting instructor.")) 
    }

    try {
        const updateInstructorData = await instructorModel.findByIdAndUpdate(
            {
                _id: instructorData?._id
            },
            req.body,
            {
                new: true
            }
        )
        if(updateInstructorData) {
            res.status(201).json({ updateInstructor: updateInstructorData})
        }
    } catch (error) {
        return next(createHttpError(500, "Error while update instructor.")) 
    }
}

export {
    createInstructor,
    updateInstructor
}