//Data Transfer Object= Encapsuila los datos y los transporta entre las capas de la apli donde se necesiten, no usan lógica de negocio porque existen solo para facilitar la transferencia de los datos  de forma eficiente y estructurada
export default class CartDTO {
  constructor(cart) {
    //extrae lista de productos de cart y se le asigna atributo products, para que cartDTO tenga la lista de productos del carrito. 
      this.products = cart.products
  }
}
  