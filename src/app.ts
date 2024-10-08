import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

// parsers
app.use(
  cors({
    origin:
      "https://l2-b3-assignment-6-client-git-main-faysalahmed000012s-projects.vercel.app/",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// application routes
app.use("/api", router);

const test = async (req: Request, res: Response) => {
  res.send("Welcome to the Assignment");
};
app.get("/", test);

// globalErrorHandler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
