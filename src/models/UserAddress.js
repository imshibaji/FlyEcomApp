import { BaseModel } from "./base";


export class UserAddressModel extends BaseModel {
    constructor() {
        super('user_addresses');
    }
}

export const userAddressModel = new UserAddressModel();