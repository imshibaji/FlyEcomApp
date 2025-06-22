import {permissionModel} from "../../models/Permission";
import BaseController from "../BaseController";

export class PermissionController extends BaseController {
    constructor() {
        super(permissionModel, 'permissions',{
            title: 'Permission',
            asApi: true
        });
    }
}
  
  