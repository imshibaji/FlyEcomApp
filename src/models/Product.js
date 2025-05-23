import { BaseModel } from "./Base"; 
export class ProductModel extends BaseModel {
    constructor() {
        super('products');
    }
}

export const productModel = new ProductModel();