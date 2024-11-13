import mongoose from "mongoose"

export interface User {
    _id: string,
    firstName: string,
    lastName: string,
    fullName: string,
    email: string,
    isInstructor: boolean,
    instructorId: mongoose.Schema.Types.ObjectId,
    mobile: number,
    profession: string,
    password: string
}