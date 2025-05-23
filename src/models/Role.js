import { BaseModel } from "./Base";


export class RoleModel extends BaseModel{
    constructor(){
        super('roles');
    }
}

export const roleModel = new RoleModel();