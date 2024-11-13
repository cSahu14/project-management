import mongoose from "mongoose";

export interface Instructor {
    _id: mongoose.Schema.Types.ObjectId,
    userId: mongoose.Schema.Types.ObjectId,
    description: string,
    aboutMe: string,
    courses: mongoose.Schema.Types.ObjectId[],
    socialMedias: string[],
    personalPortpholio: string,
}