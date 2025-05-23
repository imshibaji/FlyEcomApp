import { BaseModel } from "./Base";



export class CartModel extends BaseModel {
    constructor() {
        super('carts');
    }
}

export const cartModel = new CartModel();