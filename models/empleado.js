import mongoose from "mongoose";

const empleadoSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },

    nombre: {
        nombre: String,
        apellido: String
    },

    rol: String,
    activo: Boolean,

    datosPersonales: {
        nacionalidad: String,
        edad: Number,
        idiomas: [String]      
    },

    contrato: {
        salario: Number,
        moneda: String,        
        duracionAnios: Number  
    },

    estadisticas: {
        podios: Number,
        victorias: Number,
        poles: Number,
        campeonatos: Number
    },

    especialidades: [String],   
    herramientas: [String],     
    habilidades: [String]       
});

export default mongoose.model("Empleado", empleadoSchema);
