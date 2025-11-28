import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import { registroController, loginController } from "./controllers/usuarioController.js";
import {
    crearEmpleadoController,
    obtenerEmpleadosController,
    obtenerEmpleadoController,
    actualizarEmpleadoController,
    eliminarEmpleadoController
} from "./controllers/empleadoController.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// rutas
app.post("/registro", registroController);
app.post("/login", loginController);

app.post("/empleados", crearEmpleadoController);
app.get("/empleados/:userId", obtenerEmpleadosController);
app.get("/empleados/unico/:id", obtenerEmpleadoController);
app.put("/empleados/:id", actualizarEmpleadoController);
app.delete("/empleados/:id", eliminarEmpleadoController);

// mongo
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB conectado"))
    .catch((err) => console.error("Error conectando a MongoDB:", err));

// server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor arriba en puerto ${PORT}`);
});
