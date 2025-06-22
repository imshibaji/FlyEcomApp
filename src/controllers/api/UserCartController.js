import { userCartModel } from "../../models/UserCart";
import BaseController from "../BaseController";


export class UserCartController extends BaseController{
    constructor(){
        super(userCartModel, 'user_carts',{
            title: 'User Cart',
            asApi:true
        });
    }
}