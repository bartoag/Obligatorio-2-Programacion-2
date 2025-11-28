import dotenv from "dotenv";
dotenv.config();
require("dotenv").config();


console.log("URL:", process.env.MONGO_URL);

import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import { registroController, loginController } from "./controllers/usuarioController.js";

import {
    crearEmpleadoController,
    obtenerEmpleadosController,
    obtenerEmpleadoController,
    actualizarEmpleadoController,
    eliminarEmpleadoController
} from "./controllers/empleadoController.js";

const app = express();            // ✅ PRIMERO crear app
app.use(express.json());
app.use(cors());

// ====================
//  RUTAS DE USUARIO
// ====================
app.post("/registro", registroController);
app.post("/login", loginController);

// ====================
//  RUTAS DE EMPLEADOS
// ====================
app.post("/empleados", crearEmpleadoController);
app.get("/empleados/:userId", obtenerEmpleadosController);
app.get("/empleados/unico/:id", obtenerEmpleadoController);
app.put("/empleados/:id", actualizarEmpleadoController);
app.delete("/empleados/:id", eliminarEmpleadoController);

// ====================
//  CONEXIÓN A MONGO
// ====================

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("MongoDB conectado"))
    .catch(err => console.log(err));

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor arriba en puerto " + (process.env.PORT || 3000));
});
