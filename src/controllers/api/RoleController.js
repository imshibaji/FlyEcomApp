import { roleModel } from "../../models/Role";
import BaseController from "../BaseController";


export class RoleController extends BaseController{
    constructor(){
        super(roleModel, 'roles',{
            title: 'Role',
            asApi: true
        });
    }
}