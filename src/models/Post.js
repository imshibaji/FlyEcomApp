import { BaseModel } from "./Base";
import { userModel } from "./User";

export class PostModel extends BaseModel {
    constructor() {
        super('posts');
    }

    async user(){
        return this.belongsTo(userModel, 'user_id', 'id');
    }
}

export const postModel = new PostModel();