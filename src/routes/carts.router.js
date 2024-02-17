import { Router } from "express";
import CartDTO from "../DAO/DTO/cart.dto.js";
import OrderDTO from "../DAO/DTO/order.dto.js";
import Carts from "../DAO/mongo/carts.mongo.js";
import { orderService, cartService, userService } from "../repository/index.js";


const router = Router()
const cartMongo = new Carts()



router.post("/", async (req, res) => {
    try {
        let { products } = req.body
        const correo = req.body.email;
        let rolUser = userService.getRolUser(products.owner)
        if (rolUser == 'premium' && correo == products.owner) {
            req.logger.error('Los usuarios premium no tienen la capacidad de agregar a su carrito productos que sean de su propiedad');
            res.status(500).send({ status: "error", message: "Los usuarios premium no tienen la capacidad de agregar a su carrito productos que sean de su propiedad" });
        } else {
            let cart = new CartDTO({ products })
            let result = await cartService.createCart(cart)
            if (result) {
                req.logger.info('Carrito creado correctamente');
                res.status(200).send({ status: "success", payload: result });
            } else {
                req.logger.error("Error, No se puede crear carrito");
                res.status(500).send({ status: "error", message: "Se produjo un error interno en el servidor" });
            }

        }
    }
    catch (error) {
        res.status(500).send({ status: "error", message: "Se produjo un error interno en el servidor" });
    }
})



router.get("/", async (req, res) => {
    try {
        req.logger.info('Se accede a una lista de carritos');
        let result = await cartMongo.get()
        res.status(200).send({ status: "success", payload: result });
    }
    catch (error) {
        req.logger.info('Error, No se puede obtener la lista de carritos');
        res.status(500).send({ status: "error", message: "Error interno del servidor" });
    }
})



router.post("/:cid/purchase", async (req, res) => {
    try {
        let id_cart = req.params.cid;
        const productos = req.body.productos;
        const correo = req.body.correo;
        let cart = await cartService.validateCart(id_cart);

        if (!cart) {
            req.logger.error("No se encuentra carrito con el identificador que ha proporcionado");
            return res.status(404).json({ error: "No se encuentra carrito con el identificador que ha proporcionado" });
        }

        let validaStock = await cartService.validateStock({ productos });

        if (validaStock) {
            let totalAmount = await cartService.getQuantities({ productos });
            const orderFormat = new OrderDTO({ amount: totalAmount, purchaser: correo });
            const result = await orderService.createOrder(orderFormat);

        } else {
            req.logger.error("La cantidad de stock no es suficiente para realizar la compra");
            return res.status(400).json({ error: "La cantidad de stock no es suficiente para realizar la compra" });
        }
    } catch (error) {
        req.logger.error("Error, no se logra procesar la compra" + error.message);
        return res.status(500).json({ error: "Se ha producido un error interno al procesar la compra" });
    }
});

export default router