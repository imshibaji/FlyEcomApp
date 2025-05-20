import { BaseModel } from "./base";



export class CartModel extends BaseModel {
    constructor() {
        super('cart');
    }
}

export const cartModel = new CartModel();