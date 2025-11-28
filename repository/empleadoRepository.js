import Empleado from "../models/empleado.js";

export const crearEmpleado = (data) => Empleado.create(data);
export const obtenerEmpleados = (userId) => Empleado.find({ user: userId });
export const obtenerEmpleadoPorId = (id) => Empleado.findById(id);
export const actualizarEmpleado = (id, data) => Empleado.findByIdAndUpdate(id, data, { new: true });
export const eliminarEmpleado = (id) => Empleado.findByIdAndDelete(id);
