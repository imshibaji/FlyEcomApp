import { BaseModel } from "./base";


export class UserWishlistModel extends BaseModel {
    constructor() {
        super('user_wishlists');
    }
}

export const userWishlistModel = new UserWishlistModel();