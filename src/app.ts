import express from "express";
import path from "path";
import { authRouter } from "./routes/auth.routes";
import { rootRouter } from "./routes/index.routes";
// const cors = require('cors');
const dotenv = require("dotenv");

dotenv.config();

const app = express();
// app.use(cors());
app.use(express.json());

app.use("/", rootRouter);

export default app;
