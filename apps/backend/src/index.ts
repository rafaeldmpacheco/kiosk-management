import cors from 'cors';
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { kioskRoutes } from "./routes/kiosk";
import { initEvents } from "./utils/AutomaticEvents";
import { populateCache } from "./utils/Cache";
import { connectDatabase } from "./utils/Db";

dotenv.config();

const app: Express = express();
const port = '3002';

connectDatabase();

app.use(cors())

app.use(express.json());

app.use("/kiosk", kioskRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

initEvents();
populateCache();
