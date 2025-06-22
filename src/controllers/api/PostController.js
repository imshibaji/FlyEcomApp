import { postModel } from "../../models/Post";
import BaseController from "../BaseController";


export class PostController extends BaseController {
    constructor() {
        super(postModel, 'posts',{
            title: 'Post',
            asApi:true
        });
    }
}