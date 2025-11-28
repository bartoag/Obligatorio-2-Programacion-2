import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema({
    email: String,
    password: String
});

export default mongoose.model("Usuario", usuarioSchema);
