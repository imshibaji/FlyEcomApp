import { BaseModel } from "./Base";

export class UserRoleModel extends BaseModel {
    constructor() {
        super('user_roles');
    }
}

export const userRoleModel = new UserRoleModel();