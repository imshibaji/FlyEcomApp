import { BaseModel } from "./Base";


export class OrderModel extends BaseModel {
    constructor() {
        super('orders');
    }
}

export const orderModel = new OrderModel();