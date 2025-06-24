import { BaseModel } from "./Base";
import { postModel } from "./Post";

// class
export class UserModel extends BaseModel {
    constructor() {
        super('users');
    }

    async beforeCreate(data) {
        data.created_at = new Date();
        data.updated_at = new Date();
        return data;
    }

    async beforeUpdate(data) {
        data.updated_at = new Date();
        return data;
    }

    async posts(id) {
        return await this.hasMany(postModel, 'user_id', id);
    }
}

// instance
export const userModel = new UserModel();