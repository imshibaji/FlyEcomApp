import { BaseModel } from "./Base";

export class UserPaymentModel extends BaseModel{
    constructor(){
        super('user_payments');
    }
}

export const userPaymentModel = new UserPaymentModel();