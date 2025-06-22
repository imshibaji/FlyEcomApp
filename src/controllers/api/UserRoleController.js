import { userRoleModel } from "../../models/UserRole";
import BaseController from "../BaseController";


export class UserRoleController extends BaseController{
   constructor(){
       super(userRoleModel,'user_roles',{
        title:'User Roles',
        asApi: true
       });
   }

}