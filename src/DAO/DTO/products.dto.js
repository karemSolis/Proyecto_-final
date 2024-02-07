export default class ProductDTO {//clase 
  constructor(product) {//parámetro product que contiene la info del producto
      //extrtae la descreipción del producto para darsela a Productdto
      this.description = product.description
      //pasa lo mismo en cada una de estas 
      this.image = product.image

      this.price = product.price

      this.stock = product.stock
      
      this.availability = product.availability

      this.owner = product.owner
  }
}