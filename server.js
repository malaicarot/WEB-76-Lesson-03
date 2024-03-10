import express from "express";
import {SERVER_CONFIG} from "./src/configs/server.config.js";
import { UserRouter } from "./src/routers/user.router.js";
import { API_CONFIG } from "./src/configs/api.config.js";
import cors from "cors"

const app = express();

app.use(cors());

app.use(express.json())

app.use(SERVER_CONFIG.RESOURCES.USER.CONTEXT_PATH, UserRouter);

app.listen(SERVER_CONFIG.PORT, () => {
  console.log(`Server Is Listening on port ${SERVER_CONFIG.PORT}`);
});

