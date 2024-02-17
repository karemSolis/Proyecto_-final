import logger from "../logger";

const socket = io({
  withCredentials: true,
});


socket.on('conexion-establecida', (mensaje) => {
  logger.info('Mensaje del servidor:', mensaje)
  console.log('Mensaje del servidor:', mensaje);
});


socket.on('newProduct', (data) => {
  logger.info('Nuevo producto:', data);
  const productsElements = document.getElementById("products");
  logger.info('Lista de productos:', productsElements);
  const productElement = document.createElement('li');
  productElement.innerHTML = `${data.title} - ${data.description}`;
  productsElements.appendChild(productElement);
});


socket.on('deleteProduct', (id) => {
  logger.info('Eliminar producto:', id);
  const productElement = document.getElementById(id);
  if (productElement) {
    productElement.remove();
    logger.info('Producto eliminado de la interfaz');
  } else {
    logger.info('Producto no encontrado en la interfaz');
  }
});


document.addEventListener("DOMContentLoaded", () => {
  logger.info('DOM cargado');
  console.log('DOM cargado');


  const detalleButtons = document.querySelectorAll(".detalle-button");
  detalleButtons.forEach((button) => {

    button.addEventListener("click", (event) => {
      const productId = event.currentTarget.dataset.productId;
      //console.log('Botón de detalle clicado para el producto ID:', productId);
      window.location.href = `/products/${productId}`;
    });
  });


  const carritoBtn = document.getElementById("carrito-compra");

  async function obtenerIdCarrito() {
    try {
      const userResponse = await fetch("/api/carts/getusercart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        //console.log('ID del carrito del usuario:', userData.cartId);
        return userData.cartId;
      } else {
        const errorData = await userResponse.json();
        logger.error('No se pudo obtener el ID del carrito:', errorData);
        return null;
      }
    } catch (error) {
      logger.error('Error al obtener el ID del carrito:', error);
      return null;
    }
  }


  if (carritoBtn) {
    carritoBtn.addEventListener("click", async () => {
      try {
        const carritoId = await obtenerIdCarrito();
        if (carritoId) {
          //console.log('Redirigiendo a la página de detalles del carrito:', carritoId);
          window.location.href = `/cart/detail/${carritoId}`;
        } else {
          logger.error("No se pudo obtener el ID del carrito.");
        }
      } catch (error) {
        logger.error("Error al obtener el ID del carrito:", error);
      }
    });
  }


  const formulario = document.getElementById("messageForm");


  if (formulario) {
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = document.getElementById("nombre").value;
      const apellido = document.getElementById("apellido").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const message = document.getElementById("message").value;


      const datos = { nombre, apellido, email, password, message };

      try {
        const response = await fetch("/Register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos)
        });

        if (!response.ok) {
          const errorData = await response.json();

          if (response.status === 400) {
            showError("El correo ya está registrado");
          } else {
            showError("Error al guardar el usuario y el mensaje");
          }

          logger.error('Error durante la solicitud:', errorData);
          return;
        }

        showSuccess("Usuario y mensaje guardados con éxito");
        console.log('Formulario de registro enviado con éxito');
        formulario.reset();
      } catch (error) {
        logger.error('Error durante la solicitud:', error);
        showError('Hubo un error durante la solicitud. Por favor, inténtalo de nuevo más tarde.');
      }
    });
  }


  const resetPasswordForm = document.getElementById("resetPasswordForm");
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value;
      const newPassword = document.getElementById("newPassword").value;
      const confirmPassword = document.getElementById("confirmPassword").value;


      if (newPassword !== confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        const response = await fetch("/actualizar-pass", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, newPassword })
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert("Tiempo de enlace expirado, redirigiendo al inicio.");
            window.location.href = "/login"; // Redirigir a la página de inicio de sesión
            return
          }
          throw new Error('Error al actualizar la contraseña');
        }
        const data = await response.json();
        alert("Contraseña actualizada correctamente");
        logger.info('Contraseña actualizada correctamente:', data)
      } catch (error) {

        logger.error('Error:', error.message);
      }
    });
  }
});
