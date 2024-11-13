import mongoose from "mongoose";
import { Course } from "./courseType";

const courseSchema = new mongoose.Schema<Course>(
    {
        name: {
            type: String,
            required: true,
            index: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        price: {
            type: Number,
            required: true,
        },
        discount: {
            type: Number,
            default: 0
        },
        couponCode: {
            type: Number,
        },
        tags: {
            type: [String],
            default: []
        },
        instructors: [
            {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                index: true,
                ref: 'Instructor'
            }
        ],
        rating: {
            type: Number,
            default: 0
        },
        reviews: {
            type: [Object],
            default: []
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                index: true,
                ref: 'User',
            },
        ],
        details: {
            type: [Object],
            default: []
        },
        modules: {
            type: [Object],
            default: []
        }
    }
)

export default mongoose.model<Course>('Course', courseSchema)