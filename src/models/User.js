import { BaseModel } from "./Base";

// class
export class UserModel extends BaseModel {
    constructor() {
        super('users');
    }
}

// instance
export const userModel = new UserModel();