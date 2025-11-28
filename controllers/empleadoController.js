import {servicioCrearEmpleado,servicioObtenerEmpleados,servicioObtenerEmpleado,servicioActualizarEmpleado,servicioEliminarEmpleado
} from "../services/empleadoService.js";



export const crearEmpleadoController = async (req, res) => {
    try {
        const nuevo = await servicioCrearEmpleado(req.body);
        res.status(201).send(nuevo);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

export const obtenerEmpleadosController = async (req, res) => {
    try {
        const { userId } = req.params;
        const empleados = await servicioObtenerEmpleados(userId);
        res.send(empleados);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

export const obtenerEmpleadoController = async (req, res) => {
    try {
        const emp = await servicioObtenerEmpleado(req.params.id);
        res.send(emp);
    } catch (e) {
        res.status(404).send({ error: e.message });
    }
};

export const actualizarEmpleadoController = async (req, res) => {
    try {
        const actualizado = await servicioActualizarEmpleado(req.params.id, req.body);
        res.send(actualizado);
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};

export const eliminarEmpleadoController = async (req, res) => {
    try {
        await servicioEliminarEmpleado(req.params.id);
        res.send({ mensaje: "Empleado eliminado" });
    } catch (e) {
        res.status(400).send({ error: e.message });
    }
};
