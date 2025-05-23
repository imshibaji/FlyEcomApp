import { BaseModel } from "./Base";


export class ReviewModel extends BaseModel {
    constructor() {
        super('reviews');
    }
}

export const reviewModel = new ReviewModel();