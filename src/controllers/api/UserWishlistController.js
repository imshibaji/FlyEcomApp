import { userWishlistModel } from "../../models/UserWishlist";
import BaseController from "../BaseController";


export class UserWishlistController extends BaseController{
    constructor(){
        super(userWishlistModel, 'user_wishlists',{
            title:'User Wishlist',
            asApi: true
        });
    }

}