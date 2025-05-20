import { BaseModel } from "./base";


export class OrderModel extends BaseModel {
    constructor() {
        super('orders');
    }
}

export const orderModel = new OrderModel();