import { BaseModel } from "./Base";


export class CategoryModel extends BaseModel{
    constructor(){
        super('categories');
    }
}

export const categoryModel = new CategoryModel();