import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler"
import userRouter from "./user/userRouter";
import Instructorouter from "./instructor/instructorRouter";
import courseRouter from "./course/courseRouter";

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.json({"message": "Json message"})
})

app.use("/api/users", userRouter);
app.use("/api/instructor", Instructorouter)
app.use("/api/course", courseRouter)

// app.use(globalErrorHandler)
app.use(globalErrorHandler as (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => void);

export default app;