import { BaseModel } from "./base";


export class UserOrderModel extends BaseModel {
    constructor() {
        super('user_orders');
    }
}

export const userOrderModel = new UserOrderModel();