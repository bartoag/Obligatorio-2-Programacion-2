let empleadosList = document.getElementById("empleados-list");
let modal = document.getElementById("modal-editar");
let modalRol = document.getElementById("modal-rol");
let modalSalario = document.getElementById("modal-salario");
let modalActivo = document.getElementById("modal-activo");
let btnGuardar = document.getElementById("btn-guardar");
let btnCerrar = document.getElementById("btn-cerrar");
let empleadosData = [];
let newEdad = document.getElementById("new-edad");             // AGREGADO
let newNacionalidad = document.getElementById("new-nacionalidad");

function cargarEmpleados(userId) {
    obtenerEmpleados(userId);
}


// ----------------------------------------------------------
// GET - OBTENER EMPLEADOS DE LA API
// ----------------------------------------------------------
async function obtenerEmpleados(userId) {
    try {
        let res = await fetch(`${URL}/empleados/${userId}`);

        if (!res.ok) {
            empleadosList.innerHTML = `<p style="color:red;">Error al obtener empleados</p>`;
            return;
        }

        let data = await res.json();
        empleadosData = data;
        mostrarEmpleados(data);

    } catch (e) {
        empleadosList.innerHTML = `<p style="color:red;">Error de conexión</p>`;
    }
}

function filtrarEmpleados(rol) {
    if (rol === "todos") {
        mostrarEmpleados(empleadosData);
        return;
    }

    const filtrados = empleadosData.filter(emp => emp.rol.toLowerCase() === rol.toLowerCase());
    mostrarEmpleados(filtrados);
}


// ----------------------------------------------------------
// RENDERIZAR EMPLEADOS EN PANTALLA
// ----------------------------------------------------------
function mostrarEmpleados(lista) {
    let contenedor = document.getElementById("empleados-list");
    contenedor.innerHTML = ""; 
    let cardCrear = document.createElement("div");
    cardCrear.className = "empleado-card crear-card";
     cardCrear.innerHTML = `
    <div class="crear-content" onclick="abrirModalCrear()">
        <span class="crear-mas">+</span>
    </div>
`;
contenedor.appendChild(cardCrear);
    lista.forEach(emp => {

        let card = document.createElement("div");
        card.className = "empleado-card";

        // Ruta de imagen local (usando apellido en minúsculas por ejemplo)
        let imgSrc = `img/empleados/${emp.nombre.apellido.toLowerCase()}.png`;

        card.innerHTML = `
            <div class="card">
                <img src="${imgSrc}" class="empleado-img">

                <h3>${emp.nombre.nombre} ${emp.nombre.apellido}</h3>

                <p>${emp.datosPersonales.edad} años</p>
                <p>${emp.rol}</p>
                <p>${emp.datosPersonales.nacionalidad}</p>

                <p class="activo ${emp.activo ? "on" : "off"}">
                    ${emp.activo ? "Activo" : "Inactivo"}
                </p>

                <p class="salario">
                    $${emp.contrato.salario}
                </p>

                <div class="card-actions">
                    <button class="btn-edit" onclick="abrirModal('${emp._id}', '${emp.rol}', '${emp.contrato.salario}', '${emp.activo}')">Editar</button>
                    <button class="btn-delete" onclick="borrarEmpleado('${emp._id}')">Borrar</button>
                </div>
            </div>
        `;

        contenedor.appendChild(card);
    });
}

let empleadoEditandoId = null;

// Abrir modal con datos
function abrirModal(id, rol, salario, activo) {
    empleadoEditandoId = id;

    modalRol.value = rol;
    modalSalario.value = salario;
    modalActivo.value = (activo === "true");

    modal.style.display = "flex";
}

// Cerrar modal
btnCerrar.onclick = () => modal.style.display = "none";


// Guardar cambios (PUT)
btnGuardar.onclick = async () => {

    let dataActualizada = {
        rol: modalRol.value,
        contrato: { salario: Number(modalSalario.value) },
        activo: modalActivo.value === "true"
    };

    let res = await fetch(`${URL}/empleados/${empleadoEditandoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dataActualizada)
    });

    if (res.ok) {
        modal.style.display = "none";
        cargarEmpleados(localStorage.getItem("userId")); // recargar
    } else {
        alert("Error al actualizar empleado");
    }
};

let modalCrear = document.getElementById("modal-crear");

let newNombre = document.getElementById("new-nombre");
let newApellido = document.getElementById("new-apellido");
let newRol = document.getElementById("new-rol");
let newSalario = document.getElementById("new-salario");
let newActivo = document.getElementById("new-activo");

let btnCrear = document.getElementById("btn-crear");
let btnCrearCerrar = document.getElementById("btn-crear-cerrar");

// ABRIR MODAL CREAR
function abrirModalCrear() {
    newNombre.value = "";
    newApellido.value = "";
    newRol.value = "";
    newSalario.value = "";
    newActivo.value = "true";

    modalCrear.style.display = "flex";
}

// CERRAR
btnCrearCerrar.onclick = () => modalCrear.style.display = "none";

// GUARDAR EMPLEADO (POST)
btnCrear.onclick = async () => {
    let nuevoEmpleado = {
        user: localStorage.getItem("userId"),
        nombre: { nombre: newNombre.value, apellido: newApellido.value },
        rol: newRol.value,
        contrato: { salario: Number(newSalario.value), moneda: "USD" },
        activo: newActivo.value === "true",
        datosPersonales: {
        nacionalidad: newNacionalidad.value,
        edad: Number(newEdad.value)
        },

        especialidades: []
    };

    let res = await fetch(`${URL}/empleados`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoEmpleado)
    });

    if (res.ok) {
        modalCrear.style.display = "none";
        cargarEmpleados(localStorage.getItem("userId")); // refresca
    } else {
        alert("Error al crear empleado");
    }
};

async function borrarEmpleado(id) {
    if (!confirm("¿Seguro que querés borrar este empleado?")) {
        return;
    }

    let res = await fetch(`${URL}/empleados/${id}`, {
        method: "DELETE"
    });

    if (res.ok) {
        cargarEmpleados(localStorage.getItem("userId")); // refresca la lista
    } else {
        alert("No se pudo borrar el empleado");
    }
}
