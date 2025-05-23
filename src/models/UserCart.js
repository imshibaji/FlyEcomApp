import { BaseModel } from "./Base";


export class UserCartModel extends BaseModel {
    constructor() {
        super('user_carts');
    }
}

export const userCartModel = new UserCartModel();