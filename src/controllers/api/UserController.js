import { userModel } from "../../models/User";
import BaseController from "../BaseController";


export class UserController extends BaseController {

    constructor(){
        super(userModel, 'users', {
            title: 'User',
            // viewPrefix: 'api',
            asApi: true
        });
    }

}