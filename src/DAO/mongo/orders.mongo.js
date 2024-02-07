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
        let orders = await ordersModel.find();
        return orders;
    }

    async getOrderById(orderId) {
        try {
            let order = await ordersModel.findById(orderId).lean();
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

                return { error: "El código de la orden ya existe en atlas." };
            }

            let result = await ordersModel.create(order);
            return result;
        } catch (error) {
            return { error: "Error interno en la creación de la orden." };
        }
    }
}