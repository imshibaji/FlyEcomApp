import { userOrderModel } from "../../models/UserOrder";
import BaseController from "../BaseController";


export class UserOrderController extends BaseController{
   constructor(){
       super(userOrderModel,'user_orders',{
        title: 'User Order',
        asApi: true
       });
   }

}