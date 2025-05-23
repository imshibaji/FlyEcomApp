import { BaseModel } from "./Base";


export class PermissionModel extends BaseModel {
    constructor() {
        super('permissions');
    }
}

export const permissionModel = new PermissionModel();


