import mongoose from "mongoose";
import { User } from "./userTypes";

const UserSchema = new mongoose.Schema<User>(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            index: true,
        },
        isInstructor: {
            type: Boolean,
            default: false
        },
        instructorId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Instructor',
            index: true,
        },
        mobile: {
            type: Number,
            unique: true
        },
        profession: {
            type: String,
            trim: true
        },
        password: {
            type: String,
            required: true,
        }
    },{ timestamps: true }
)

export default mongoose.model<User>("User", UserSchema)