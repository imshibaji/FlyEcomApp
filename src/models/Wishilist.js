import { BaseModel } from "./Base";

export class WishlistModel extends BaseModel {
    constructor(){
        super('wishlist');
    }
}

export const wishlistModel = new WishlistModel();