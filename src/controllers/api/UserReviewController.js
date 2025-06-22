import { userReviewModel } from "../../models/UserReview";
import BaseController from "../BaseController";


export class UserReviewController extends BaseController{

    constructor(){
        super(userReviewModel, 'user_review',{
            title:'User Review',
            asApi: true
        });
    }
}