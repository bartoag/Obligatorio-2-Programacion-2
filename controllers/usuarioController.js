import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

// REGISTRO
export const registroController = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ msg: "Campos incompletos" });

        // buscar por username
        let existe = await Usuario.findOne({ username });
        if (existe) return res.status(400).json({ msg: "El usuario ya existe" });

        // hash si querés, o dejar plano si no te importa
        let hash = await bcrypt.hash(password, 10);

        let nuevo = new Usuario({
            username,
            password: hash
        });

        await nuevo.save();
        res.status(201).json({ msg: "Usuario registrado" });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};

// LOGIN
export const loginController = async (req, res) => {
    try {
        let { username, password } = req.body;

        if (!username || !password)
            return res.status(400).json({ msg: "Campos incompletos" });

        let usuario = await Usuario.findOne({ username });
        if (!usuario) return res.status(400).json({ msg: "Usuario no existe" });

        let coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(400).json({ msg: "Contraseña incorrecta" });

        // devolvemos userId
        res.json({
            msg: "Login correcto",
            userId: usuario._id
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Error en el servidor" });
    }
};
