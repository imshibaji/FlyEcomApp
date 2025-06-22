import { userAddressModel } from "../../models/UserAddress";
import BaseController from "../BaseController";


export class UserAddressController extends  BaseController{
    constructor() {
        super(userAddressModel, 'user_addresses',{
            title: 'User Addresses',
            asApi:true
        });
    }
}