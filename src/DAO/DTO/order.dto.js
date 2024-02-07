import {nanoid} from "nanoid"

export default class OrderDTO { //clase 
    constructor(order) {
        //se genera código unico para la order
        this.code = nanoid()
        //asigna fecha y hr
        this.purchase_datetime = new Date()
        //momnto total
        this.amount = order.amount
        //representa al comprador que realizó la compra 
        this.purchaser = order.purchaser
    }
}