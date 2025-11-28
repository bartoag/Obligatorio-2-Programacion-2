import Usuario from "../models/usuario.js";

export const crearUsuario = async (data) => {
    return await Usuario.create(data);
};

export const buscarUsuarioPorUsername = async (username) => {
    return await Usuario.findOne({ username });
};
