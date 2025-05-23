import { BaseModel } from "./Base";

export class PostModel extends BaseModel {
    constructor() {
        super('posts');
    }
}

export const postModel = new PostModel();