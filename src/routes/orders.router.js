import { Router } from "express";
import OrderDTO from "../DAO/DTO/order.dto.js";
import { orderService } from "../repository/index.js";
import Orders from "../DAO/mongo/orders.mongo.js"

const router = Router()

const OrderMongo = new Orders()


router.get("/", async (req, res) => {
    try {
        req.logger.info('Se obtiene lista de la orden');
        let result = await OrderMongo.get()
        res.status(200).send({ status: "success", payload: result });
    }
    catch (error) {
        req.logger.info('Error, no se puede obtener la lista de la orden ');
        res.status(500).send({ status: "error", message: "Error del servidor" });
    }
})


router.post("/", async (req, res) => {
    try {
        let { amount, purchaser } = req.body
        let orden = new OrderDTO({ amount, purchaser })
        let result = await orderService.createOrder(orden)
        if (result) {
            req.logger.info('La orden se ha creado correctamente :)');
            res.status(200).send({ status: "success", payload: result });
        } else {
            req.logger.error("Error, no se ha podido rear la orden");
            res.status(500).send({ status: "error", message: "No se ha podido crear la orden" });
        }
    }
    catch (error) {
        res.status(500).send({ status: "error", message: "Error del servidor" });
    }
})

export default router