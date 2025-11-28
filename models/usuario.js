import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const Usuario = mongoose.model("Usuario", UsuarioSchema);

export default Usuario;
