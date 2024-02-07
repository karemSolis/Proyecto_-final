import mongoose from 'mongoose'
import cartsModel from './models/cart.model.js'
import productsModel from './models/products.model.js'

export default class Carts {
    constructor() { }

    get = async () => {
        let carts = await cartsModel.find();
        return carts;
    };


    getCart = async (id_cart) => {
        try {
            const cart = await cartsModel.findById(id_cart);

            if (!cart) {
                return { error: 'No se encontró el carrito con el ID proporcionado' };
            }

            return { cart };
        } catch (error) {
            console.error('Error al obtener el carrito:', error);
            return { error: 'Error interno al obtener el carrito' };
        }
    };


    getQuantities = async ({ productos }) => {
        try {
            let totalAmount = 0;

            if (!productos || !Array.isArray(productos)) {
                console.error('La propiedad "productos" no es un array válido.');
                return totalAmount;
            }

            for (const producto of productos) {
                totalAmount += producto.price * producto.stock;
            }

            return totalAmount;
        } catch (error) {
            console.error('Error al calcular el monto:', error);
            return 0;
        }
    };


    getStock = async ({ productos }) => {
        try {
            const stockInfo = {};
            const errors = [];

            for (const producto of productos) {
                const productInCollection = await productsModel.findOne({
                    description: producto.description,
                });

                if (!productInCollection) {
                    errors.push({
                        description: producto.description,
                        error: `El producto no se encuentra en la colección`,
                    });
                    stockInfo[producto.description] = {
                        status: 'No encontrado en la colección',
                    };
                    continue;
                }

                if (
                    productInCollection.stock !== undefined &&
                    productInCollection.stock >= producto.stock
                ) {
                    await productsModel.updateOne(
                        { description: productInCollection.description },
                        { $inc: { stock: -producto.stock } }
                    );

                    stockInfo[producto.description] = {
                        status: 'Suficiente',
                        availableQuantity: productInCollection.stock - producto.stock,
                        requiredQuantity: producto.stock,
                    };
                } else {
                    errors.push({
                        description: producto.description,
                        error: 'Insuficiente',
                    });
                    stockInfo[producto.description] = { status: 'Insuficiente' };
                }
            }

            if (errors.length > 0) {
                return { errors, stockInfo };
            }

            return stockInfo;
        } catch (error) {
            return { error: 'Error interno al obtener el stock' };
        }
    };


    addCart = async (cart) => {
        let result = await cartsModel.create(cart);
        return result;;
    };


    addProductsToCart = async (cartId, productId, quantity) => {
        try {
            if (typeof cartId !== 'string') {
                throw new Error('El ID del carrito debe ser una cadena de caracteres');
            }

            const cartObjectId = new mongoose.Types.ObjectId(cartId);

            let cart = await cartsModel.findById(cartObjectId);

            const existingProduct = cart.products.find((product) =>
                product.productId.equals(productId)
            );
            if (existingProduct) {
                existingProduct.quantity += parseInt(quantity, 10);
            } else {

                cart.products.push({
                    productId: productId,

                    quantity: quantity,
                });
            }

            await cart.save();

            console.log('Producto agregado al carrito correctamente');
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw new Error('Error al agregar producto al carrito de compras');
        }
    };


    getCartMoreProducts = async (cartId) => {

        try {
            const cart = await cartsModel
                .findById(cartId)
                .populate('products.productId')
                .lean();
            if (!cart) {
                return 'ups, no se encuentra carrito';
            }
            return cart;
        } catch (error) {
            return 'No se logra obtener carrito con productos';
        }
    };

}
