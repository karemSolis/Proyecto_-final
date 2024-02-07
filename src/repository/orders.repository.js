import OrderDTO from "../DAO/DTO/order.dto.js";

export default class OrderRepository {
    constructor(dao) {
        this.dao = dao
    }

    getOrders = async () => {
        let result = await this.dao.get()
        return result
    }

    createOrder = async (order) => {
        let orderToInsert = new OrderDTO(order)
        let result = await this.dao.addOrder(orderToInsert)
        return result
    }
}