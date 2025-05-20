import { BaseModel } from "./base";

export class UserRoleModel extends BaseModel {
    constructor() {
        super('user_roles');
    }
}

export const userRoleModel = new UserRoleModel();