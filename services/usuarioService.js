import { crearUsuario, buscarUsuarioPorUsername } from "../repository/usuarioRepository.js";

export const registrarUsuario = async (data) => {

    if (!data.username || !data.password) {
        throw new Error("Falta usuario o contraseña");
    }

    const existe = await buscarUsuarioPorUsername(data.username);
    if (existe) throw new Error("El usuario ya existe");

    
    return await crearUsuario(data);
};


export const loginUsuario = async (data) => {

    if (!data.username || !data.password) {
        throw new Error("Falta usuario o contraseña");
    }

    const usuario = await buscarUsuarioPorUsername(data.username);
    if (!usuario) throw new Error("Usuario no encontrado");

    if (usuario.password !== data.password) {
        throw new Error("Contraseña incorrecta");
    }

    return usuario;
};
