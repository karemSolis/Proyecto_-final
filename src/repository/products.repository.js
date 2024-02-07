import ProductDTO from "../DAO/DTO/products.dto.js";

export default class ProductRepository {
    constructor(dao) {
        this.dao = dao
    }

    getProducts = async () => {
        let result = await this.dao.get()
        return result
    }

    createProduct = async (product) => {
        let prodToInsert = new ProductDTO(product)
        let result = await this.dao.addProduct(prodToInsert)
        return result
    }
}