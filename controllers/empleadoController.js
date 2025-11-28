import Empleado from "../models/empleado.js";

// POST
export const crearEmpleadoController = async (req, res) => {
    try {
        const nuevo = new Empleado(req.body);
        await nuevo.save();
        res.status(201).json(nuevo);
    } catch (err) {
        res.status(500).json({ msg: "Error al crear empleado" });
    }
};

// GET LISTA
export const obtenerEmpleadosController = async (req, res) => {
    try {
        const { userId } = req.params;
        const empleados = await Empleado.find({ user: userId });
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener empleados" });
    }
};

// GET UNO
export const obtenerEmpleadoController = async (req, res) => {
    try {
        const empleado = await Empleado.findById(req.params.id);
        res.json(empleado);
    } catch (err) {
        res.status(500).json({ msg: "Error al obtener empleado" });
    }
};

// PUT
export const actualizarEmpleadoController = async (req, res) => {
    try {
        await Empleado.findByIdAndUpdate(req.params.id, req.body);
        res.json({ msg: "Empleado actualizado" });
    } catch (err) {
        res.status(500).json({ msg: "Error al actualizar" });
    }
};

// DELETE
export const eliminarEmpleadoController = async (req, res) => {
    try {
        await Empleado.findByIdAndDelete(req.params.id);
        res.json({ msg: "Empleado eliminado" });
    } catch (err) {
        res.status(500).json({ msg: "Error al borrar" });
    }
};
