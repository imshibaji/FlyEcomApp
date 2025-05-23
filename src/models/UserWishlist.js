import { BaseModel } from "./Base";


export class UserWishlistModel extends BaseModel {
    constructor() {
        super('user_wishlists');
    }
}

export const userWishlistModel = new UserWishlistModel();