import { BaseModel } from "./base";


export class RoleModel extends BaseModel{
    constructor(){
        super('roles');
    }
}

export const roleModel = new RoleModel();