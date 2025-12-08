import express from "express";
import { rootRouter } from "./routes/index.routes";
import { errorHandler } from "./middlewares/errorHandler";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", rootRouter);

app.use(errorHandler);

export default app;
