import mongoose from "mongoose";

export interface Course {
    _id: mongoose.Schema.Types.ObjectId,
    name: string,
    description: string,
    price: number,
    discount: number,
    couponCode: number,
    tags: string[],
    instructors: mongoose.Schema.Types.ObjectId[],
    rating: number,
    reviews: object[],
    students: mongoose.Schema.Types.ObjectId[],
    details: object[],
    modules: object[]
}