import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import logger from "@wisecare/logging";
import { pinoHttp } from "@wisecare/logging/middleware";

const app: Express = express();

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  pinoHttp({
    logger,
  }),
);

app.use(cors());
app.use(helmet());
app.use(compression());

app.get("/", (_, res) => {
  res.json({ message: "Hello World" });
});

app.listen(PORT, () => {
  console.log(`Server is running on https://localhost:${PORT}`);
});
