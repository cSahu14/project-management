import mongoose from "mongoose";
import { Instructor } from "./instructorType";

const instructorSchema = new mongoose.Schema<Instructor>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true,
    },
    description: {
      type: String,
      required: true,
    },
    aboutMe: {
      type: String,
      required: true,
    },
    courses: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        index: true,
      },
    ],
    socialMedias: {
      type: [String],
      default: [],
    },
    personalPortpholio: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<Instructor>("Instructor", instructorSchema);
