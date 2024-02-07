import { Carts, Products, Orders, Users } from "../DAO/factory.js";

import CartRepository from "./cart.repository.js";
import ProductRepository from "./products.repository.js";
import UserRepository from "./users.repository.js";
import OrderRepository from "./orders.repository.js";

export const cartService = new CartRepository(new Carts())
export const productService = new ProductRepository(new Products())
export const userService = new UserRepository(new Users())
export const orderService = new OrderRepository(new Orders())