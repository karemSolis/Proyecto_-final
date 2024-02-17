import logger from '../logger.js'

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    console.log("Email y contraseña obtenidos del formulario:", email, password);

    try {
        const response = await fetch("/login", {
            method: "POST",
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-Type": "application/json",
            },
        });


        if (response.ok) {
            const data = await response.json();
            localStorage.setItem("token", data.token);

            let redirectUrl = '';

            if (data.token && data.user.rol === 'admin') {
                redirectUrl = '/admin';

            } else if (data.token && data.user.rol === 'usuario') {
                redirectUrl = '/current';

            } else if (data.token && data.user.rol === 'premium') {
                redirectUrl = `/current-plus?token=${encodeURIComponent(data.token)}`;
            } else {
                logger.error("Rol de usuario no reconocido:", data.user.rol);
            }

            if (redirectUrl) {
                window.location.href = redirectUrl;
            } else {
                logger.error("Rol de usuario no reconocido:", data.user.rol);
            }
        } else {
            // Manejar errores específicos según el código de estado de la respuesta
            if (response.status === 401) {
                logger.error("Error de autenticación: Contraseña incorrecta.");
            } else {
                logger.error("Error en el inicio de sesión:", response.statusText);
            }
        }
    } catch (error) {
        // Manejar errores de red
        logger.error("Error de red:", error);
    }
});



document.addEventListener("DOMContentLoaded", function () {
    const forgotPasswordButton = document.getElementById("forgotPasswordButton");
    const lblRecuperacion = document.getElementById("lblRecuperacion");

    forgotPasswordButton.addEventListener("click", async function (event) {
        event.preventDefault();
        const email = document.getElementById("email").value;

        try {
            const responsePass = await fetch("/forgot-password", {
                method: "POST",
                body: JSON.stringify({ email }),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (responsePass.ok) {
                const result = await responsePass.text();
                lblRecuperacion.textContent = result;
            } else {
                const result = await responsePass.text();
                lblRecuperacion.textContent = result;
                logger.error("Error en la solicitud de recuperación de contraseña:", responsePass.statusText);
            }
        } catch (error) {
            logger.error("Error de red en la solicitud de recuperación de contraseña:", error);
        }
    });
});