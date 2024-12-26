import { Router } from "express";
import { createProject, getProjects } from "../src/controllers/projectController";

const router = Router();

router.get("/", getProjects);
router.post("/", createProject);

export default router;