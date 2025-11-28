import Usuario from "../models/usuario.js";
import bcrypt from "bcryptjs";

// REGISTRO
export const registroController = async (req, res) => {
    try {
        let { email, password } = req.body;

        let existe = await Usuario.findOne({ email });
        if (existe) return res.status(400).json({ msg: "El usuario ya existe" });

        let hash = await bcrypt.hash(password, 10);

        let nuevo = new Usuario({
            email,
            password: hash
        });

        await nuevo.save();
        res.status(201).json({ msg: "Usuario creado" });
    } catch (err) {
        res.status(500).json({ msg: "Error en servidor" });
    }
};

// LOGIN
export const loginController = async (req, res) => {
    try {
        let { email, password } = req.body;

        let usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ msg: "Credenciales inválidas" });

        let coincide = await bcrypt.compare(password, usuario.password);
        if (!coincide) return res.status(400).json({ msg: "Credenciales inválidas" });

        res.json({
            msg: "Login correcto",
            userId: usuario._id
        });
    } catch (err) {
        res.status(500).json({ msg: "Error en servidor" });
    }
};
