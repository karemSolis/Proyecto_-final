
import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';


dotenv.config();


const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS 
    }
});


const router = express.Router();


router.post('/enviar-correo', (req, res) => {

    const { email, mensaje } = req.body;

    const messageToSend = mensaje;

    const mailOptions = {
        from: 'soliskarem@gmail.com', 
        to: email, 
        subject: 'Mensaje después del login',
        text: messageToSend 
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {

            console.log('Error enviando email:', error.message);
            res.status(500).json({ error: 'Error al enviar el correo' });
        } else {

            console.log('Email enviado');
            res.status(200).json({ message: 'Correo enviado con éxito' });
        }
    });
});


export default router;

export { transporter };
