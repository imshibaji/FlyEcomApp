
import { orderModel } from "../../models/Order";
import BaseController from "../BaseController";

export class OrderController extends BaseController{
    constructor(){
        super(orderModel, 'orders',{
            title: 'Order',
            asApi: true
        });
    }
}
    