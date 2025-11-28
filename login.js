let URL = " https://obligatorio-2-programacion-2-2.onrender.com"; // cambiar luego si lo subís a Render

let loginContainer = document.getElementById("contenedorlogin");
let appContainer = document.getElementById("contenedorpagina");


// ======== FUNCIÓN PARA MOSTRAR MENSAJES ========
function mostrarMensaje(texto, tipo = "ok") {
    let msg = document.getElementById("mensaje");

    msg.textContent = texto;
    msg.className = "";
    msg.style.display = "block";

    if (tipo === "error") {
        msg.classList.add("errormensaje");
    } else {
        msg.classList.add("okmensaje");
    }

    setTimeout(function () {
        msg.style.display = "none";
    }, 3000);
}

// ================= REGISTRO =================
let btnRegister = document.getElementById("btn-register");
btnRegister.addEventListener("click", async function () {
    let username = document.getElementById("reg-username").value.trim();
    let password = document.getElementById("reg-password").value.trim();

    if (!username || !password) {
        mostrarMensaje("Completa todos los campos", "error");
        return;
    }

    try {
        let res = await fetch(`${URL}/registro`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();

        if (res.ok) {
            mostrarMensaje("Usuario registrado con éxito", "ok");
        } else {
            mostrarMensaje(data.error, "error");
        }

    } catch (e) {
        mostrarMensaje("Error al registrar", "error");
    }
});

// ================= LOGIN =================
let btnLogin = document.getElementById("btn-login");
btnLogin.addEventListener("click", async function () {
    let username = document.getElementById("login-username").value.trim();
    let password = document.getElementById("login-password").value.trim();

    if (!username || !password) {
        mostrarMensaje("Completa todos los campos", "error");
        return;
    }

    try {
        let res = await fetch(`${URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password })
        });

        let data = await res.json();

        if (res.ok) {
            localStorage.setItem("userId", data._id);
            mostrarMensaje("Login exitoso", "ok");

            loginContainer.style.display = "none";
            appContainer.style.display = "block";
            cargarEmpleados(data._id);

            

        } else {
            mostrarMensaje(data.error, "error");
        }

    } catch (e) {
        mostrarMensaje("Error al iniciar sesión", "error");
    }
});

