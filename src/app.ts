import express from "express";
import rolRoutes from "./routes/rol.routes";
import rolUsuarios from "./routes/usuario.routes";

const app = express();

app.use(express.json());

app.use("/roles", rolRoutes);

app.use("/usuarios", rolUsuarios);

export default app;