document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

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
        } else if (data.token && data.user.rol === 'user') {

            redirectUrl = '/current';
        } else if (data.token && data.user.rol === 'premium') {

            redirectUrl = `/current-plus?token=${encodeURIComponent(data.token)}`;
        }
    
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } else {
            console.error("Rol de usuario no reconocido:", data.user.rol);
        }
    } else {
        console.error("Error en el inicio de sesión:", response.statusText);
    }
  } catch (error) {
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