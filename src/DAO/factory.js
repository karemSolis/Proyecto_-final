import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()

export let Carts
export let Products
export let Users
export let Orders
switch (process.env.PERSISTENCE) {
    case "MONGO":
        const connection = mongoose.connect(process.env.MONGO_URL)
        const { default: CartsMongo } = await import('./mongo/carts.mongo.js')
        const { default: ProductsMongo } = await import('./mongo/products.mongo.js')
        const { default: UsersMongo } = await import('./mongo/users.mongo.js')
        const { default: OrdersMongo } = await import('./mongo/orders.mongo.js')
        Carts = CartsMongo
        Products = ProductsMongo
        Users = UsersMongo
        Orders = OrdersMongo
        break;
    case "MEMORY":
        const { default: CartsMemory } = await import("./memory/carts.memory.js")
        const { default: ProductsMemory } = await import("./memory/products.memory.js")
        const { default: UsersMemory } = await import("./memory/users.memory.js")
        const { default: OrdersMemory } = await import("./memory/orders.memory.js")
        Carts = CartsMemory
        Products = ProductsMemory
        Users = UsersMemory
        Orders = OrdersMemory
        break
    default:

}