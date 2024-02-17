import logger from "../logger";
const socket = io()

document.getElementById('email-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const emailInput = document.getElementById('email');
    const email = emailInput.value;
    emailInput.value = '';

    const comInput = document.getElementById('com');
    const comment = comInput.value;
    comInput.value = '';
    logger.info(email)
    logger.info(comment)

    socket.emit("newEmail", { email: email, comment: comment });

}
)

socket.on("success", (data) => {
    Swal.fire({
        icon: 'success',
        title: data,
        text: `Correo enviado`,
        confirmButtonText: 'Aceptar',
    }).then((result) => {
        if (result.isConfirmed) {
            location.reload();
        }
    });
});

