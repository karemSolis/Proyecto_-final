import mongoose from 'mongoose';

const ordersCollection = "order";

const orderSchema = new mongoose.Schema({
    code: String,
    purchase_datetime: Date,
    amount: Number,
    purchaser: String,
    id_cart_order: String 
});

const ordersModel = mongoose.model(ordersCollection, orderSchema);

export default class Orders {
    constructor() {}

    async get() {
        try {
            let orders = await ordersModel.find();
            console.log("Orders:", orders); // Añadir este console.log
            return orders;
        } catch (error) {
            console.error("Error al obtener las órdenes:", error);
            return "Error interno";
        }
    }

    async getOrderById(orderId) {
        try {
            let order = await ordersModel.findById(orderId).lean();
            console.log("Order by ID:", order); // Añadir este console.log
            return order;
        } catch (error) {
            console.error("Error al obtener la orden por ID:", error);
            return "Error interno";
        }
    }

    async addOrder(order) {
        try {
            const existingOrder = await ordersModel.findOne({ code: order.code }); 
            if (existingOrder) {
                console.log("Orden existente:", existingOrder); // Añadir este console.log
                return { error: "El código de la orden ya existe en atlas." };
            }

            let result = await ordersModel.create(order);
            console.log("Orden creada:", result); // Añadir este console.log
            return result;
        } catch (error) {
            console.error("Error interno en la creación de la orden:", error);
            return { error: "Error interno en la creación de la orden." };
        }
    }
}
