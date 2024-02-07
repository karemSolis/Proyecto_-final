import CartDTO from "../DAO/DTO/cart.dto.js";

export default class CartRepository {
    constructor(dao) {
        this.dao = dao
    }


    getCarts = async () => {
        let result = await this.dao.get()
        return result
    }


    validateCart = async (id_cart) => {
        console.log("entra al validateCart")
        let result = await this.dao.getCart(id_cart)
        return result
    }


    getQuantities = async ({productos}) => {
        let result = await this.dao.getQuantities({productos})
        return result
    }


    createCart = async (cart) => {
        let cartToInsert = new CartDTO(cart)
        let result = await this.dao.addCart(cartToInsert)
        return result
    }
    
    
    validateStock = async ({productos}) => {
        let result = await this.dao.getStock({productos})
        return result
    }


}