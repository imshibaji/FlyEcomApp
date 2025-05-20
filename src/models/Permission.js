import { BaseModel } from "./base";


export class PermissionModel extends BaseModel {
    constructor() {
        super('permissions');
    }
}

export const permissionModel = new PermissionModel();


