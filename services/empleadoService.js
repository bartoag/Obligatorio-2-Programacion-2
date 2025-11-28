import {
    crearEmpleado, obtenerEmpleados,obtenerEmpleadoPorId,actualizarEmpleado,eliminarEmpleado
} 

from "../repository/empleadoRepository.js";

export const servicioCrearEmpleado = async (data) => {
    if (!data.user) throw new Error("Falta userId");
    return await crearEmpleado(data);
};

export const servicioObtenerEmpleados = async (userId) => {
    return obtenerEmpleados(userId);
};

export const servicioObtenerEmpleado = async (id) => {
    const emp = await obtenerEmpleadoPorId(id);
    if (!emp) throw new Error("Empleado no encontrado");
    return emp;
};

export const servicioActualizarEmpleado = async (id, data) => {
    return actualizarEmpleado(id, data);
};

export const servicioEliminarEmpleado = async (id) => {
    return eliminarEmpleado(id);
};
