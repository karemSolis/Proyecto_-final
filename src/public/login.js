// document.getElementById('loginForm').addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const email = document.querySelector("#email").value;
//   const password = document.querySelector("#password").value;

//   try {
//       const response = await fetch("/login", {
//           method: "POST",
//           body: JSON.stringify({ email, password }),
//           headers: {
//               "Content-Type": "application/json",
//           },
//       });

//       if (response.ok) {
//         const data = await response.json();
//         localStorage.setItem("token", data.token);
    
//         let redirectUrl = '';
    
//         if (data.token && data.user.rol === 'admin') {
//             redirectUrl = '/admin';
            
//         } else if (data.token && data.user.rol === 'user') {
//             redirectUrl = '/current';

//         } else if (data.token && data.user.rol === 'premium') {

//             redirectUrl = `/current-plus?token=${encodeURIComponent(data.token)}`;
//         }
    
//         if (redirectUrl) {
//             window.location.href = redirectUrl;
//         } else {
//             console.error("Rol de usuario no reconocido:", data.user.rol);
//         }
//     } else {
//         console.error("Error en el inicio de sesión:", response.statusText);
//     }
//   } catch (error) {
//       console.error("Error de red:", error);
//   }
// });

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log("Formulario de inicio de sesión enviado.");
    
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
        console.log("Respuesta recibida:", response);

        if (response.ok) {
            console.log("Inicio de sesión exitoso.");
            const data = await response.json();

            console.log("Datos recibidos del servidor:", data);
            localStorage.setItem("token", data.token);

            let redirectUrl = '';

            if (data.token && data.user.rol === 'admin') {
                console.log("El usuario tiene el rol de administrador.");
                redirectUrl = '/admin';

            } else if (data.token && data.user.rol === 'usuario') {
                console.log("El usuario tiene el rol de usuario.");
                redirectUrl = '/current';

            } else if (data.token && data.user.rol === 'premium') {
                console.log("El usuario tiene el rol premium.");
                redirectUrl = `/current-plus?token=${encodeURIComponent(data.token)}`;
            } else {
                console.error("Rol de usuario no reconocido:", data.user.rol);
            }

            if (redirectUrl) {
                console.log("Redirigiendo al usuario a:", redirectUrl);
                window.location.href = redirectUrl;
            } else {
                console.error("Rol de usuario no reconocido:", data.user.rol);
            }
        } else {
            // Manejar errores específicos según el código de estado de la respuesta
            if (response.status === 401) {
                console.error("Error de autenticación: Contraseña incorrecta.");
            } else {
                console.error("Error en el inicio de sesión:", response.statusText);
            }
        }
    } catch (error) {
        // Manejar errores de red
        console.error("Error de red:", error);
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
              console.error("Error en la solicitud de recuperación de contraseña:", responsePass.statusText);
          }
      } catch (error) {
          console.error("Error de red en la solicitud de recuperación de contraseña:", error);
      }
  });
});