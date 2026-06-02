import express from "express";
import rolRoutes from "./routes/rol.routes";

const app = express();

app.use(express.json());

app.use("/roles", rolRoutes);

export default app;