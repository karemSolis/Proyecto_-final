import mongoose from "mongoose";

const productsCollection = "products";

let Products;

if (mongoose.models[productsCollection]) { //con esto comprueba si hay un modelo registrado 
    Products = mongoose.model(productsCollection);
} else {
    const productsSchema = new mongoose.Schema({
        product: { type: String, max: 100 }, //acá represento el nombre del producto

        image: { type: String, max: 100 }, //acá la url de la imagen asociada al producto////

        description: { type: String, max: 400 },

        price: { type: Number },

        stock: { type: Number },

        availability: { type: String, enum: ['in_stock', 'out_of_stock'] }, //acá la disponibilidad del producto, solo puede tener estos valores 
        
        owner: { type: String, max: 70 }//preopietario
    });
    Products = mongoose.model(productsCollection, productsSchema);
}
export default Products;
