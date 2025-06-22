import { cartModel } from "../../models/Cart";
import BaseController from "../BaseController";


export class CartController extends BaseController{
    constructor(){
        super(
            cartModel,'carts',{
                title: 'Cart',
                asApi: true
            }
        )
    }
}

