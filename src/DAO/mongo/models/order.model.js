import mongoose from "mongoose"


const ordersCollection = "order";

const orderSchema = new mongoose.Schema({
    code: String,//código de order

    purchase_datetime: Date,//la fecha y la hora 

    amount: Number,//monto

    purchaser: String,//usuario que compra
    
    id_cart_order: String//carrito asociado 
})

const ordersModel = mongoose.model(ordersCollection, orderSchema)
export default ordersModel