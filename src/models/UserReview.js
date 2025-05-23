import { BaseModel } from "./Base";

export class UserReviewModel extends BaseModel {
    constructor() {
        super('user_reviews');
    }
}

export const userReviewModel = new UserReviewModel();

