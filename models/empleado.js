import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    user: String,
    nombre: {
        nombre: String,
        apellido: String
    },
    rol: String,
    contrato: {
        salario: Number,
        moneda: String
    },
    activo: Boolean,
    datosPersonales: {
        nacionalidad: String,
        edad: Number
    },
    especialidades: [String]
});

export default mongoose.model("Empleado", empleadoSchema);
