import { registrarUsuario, loginUsuario } from "../services/usuarioService.js";

export const registroController = async (req, res) => {
    try {
        const nuevo = await registrarUsuario(req.body);
        res.status(201).send(nuevo);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};

export const loginController = async (req, res) => {
    try {
        const usuario = await loginUsuario(req.body);
        res.status(200).send(usuario);
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
};
