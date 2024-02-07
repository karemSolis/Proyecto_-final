//views.router.js
import express from "express";
import fs from "fs/promises";
import path from "path";
import handlebars from 'express-handlebars';
import { productModel } from "../DAO/mongo/models/products.model.js";
import { userModel } from "../DAO/mongo/models/user.model.js";
import { authToken } from "../utils.js";
import passport from "passport";
import CartDao from "../DAO/mongo/carts.mongo.js";

const router = express.Router();
const cartDaoInstance = new CartDao();
const PRODUCTS_PER_PAGE = 10;

router.get("/", async (req, res) => {
    try {

        const contenidoJson = await fs.readFile("products.json", "utf-8");
        const productos = JSON.parse(contenidoJson);

        console.log("Leyendo el archivo JSON y mostrando la vista home...");
        

    res.render("home", {  });//productos
    } catch (error) {
        console.log("Error al leer el archivo JSON:", error);
        res.status(500).send("Error al cargar la vista");
    }
});

router.get("/register", async (req, res) => {
    try {
        console.log("Renderizando la vista register...");
        res.render("register");
    } catch (error) {
        console.log("Error al cargar la página de registro:", error);
        res.status(500).json({ message: "Error al cargar la página" });
    }
});

router.get("/allproducts", passport.authenticate("current", { session: false }), async (req, res) => {
    try {
        console.log("Renderizando la vista de todos los productos...");
        const user = req.user;  // Cambiado: Obtén el usuario directamente de req.user

        const page = parseInt(req.query.page) || 1;
        const products = await productModel.find().limit(PRODUCTS_PER_PAGE).lean();
        const totalProducts = await productModel.countDocuments();
        const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);
        const prevPage = page - 1;
        const nextPage = page + 1;
        const prevLink = page > 1;
        const nextLink = page < totalPages;


        res.render("products", {
            productos: products,
            page,
            totalPages,
            nextPage,
            prevPage,
            prevLink,
            nextLink,
            nombre: user.nombre,
            apellido: user.apellido,
            email: user.email,
            rol: user.rol,
        });
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).json({ message: "Error al obtener los productos" });
    }
});

router.get("/login", async (req, res) => {
    try {
        console.log("Renderizando la vista login...");
        res.render("login", {});
    } catch (error) {
        console.log("Error al acceder a la vista de login:", error);
    }
});

router.get("/reset_password/:token", authToken, async (req, res) => {
    try {
        const token = req.params.token;
        console.log("Token recibido:", token);
        console.log("Renderizando la vista de recuperación de contraseña...");
        res.render("recovery", {});
    } catch (error) {
        console.log("Error al acceder a la vista de recuperación de contraseña:", error);
    }
});

router.get("/profile", async (req, res) => {
    try {
        const nombre = req.session.nombreUsuario;
        const apellido = req.session.apellidoUsuario;
        const email = req.session.emailUsuario;
        const rol = req.session.rolUsuario;

        console.log("Renderizando la vista de perfil...");
        res.render("profile", {
            nombre: nombre,
            apellido: apellido,
            email: email,
            rol: rol,
        });
    } catch (error) {
        console.log("Error al acceder a la vista de perfil:", error);
    }
});

router.get("/cart/detail/:cartId", async (req, res) => {
    try {
        const cartId = req.params.cartId;
        console.log("Cart ID:", cartId);

        const cartDetails = await cartDaoInstance.getCartById(cartId);
        console.log("Cart Details:", cartDetails);

        console.log("Renderizando la vista de detalles del carrito...");
        res.render("cartDetail", { cart: cartDetails });
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).json({ message: "Error al cargar la página" });
    }
});

export default router;