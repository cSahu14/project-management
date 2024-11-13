import express from "express";
import authenticate from "../middlewares/authenticate";
import { createInstructor, updateInstructor } from "./instructorController";

const Instructorouter = express.Router();

Instructorouter.post("/createInstructor", authenticate, createInstructor)
Instructorouter.patch("/updateInstructor/:instructorId", authenticate, updateInstructor)

export default Instructorouter