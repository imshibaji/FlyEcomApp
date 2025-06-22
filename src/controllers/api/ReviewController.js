import { reviewModel } from "../../models/Review";
import BaseController from "../BaseController";


export class ReviewController extends BaseController {
    constructor() {
        super(reviewModel,'reviews',{
            title: 'Reviews',
            asApi: true
        });
    }
}