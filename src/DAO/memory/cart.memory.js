export default class CartMemory {

  constructor() {
    //atributo data con array vacío para almacenar los datos temporalmente de las compors en la memoria delservidor 
    this.data = [];
  }

  get() { //este es el que devuelve el array con los datos de las compras
    return this.data;
  }
}
