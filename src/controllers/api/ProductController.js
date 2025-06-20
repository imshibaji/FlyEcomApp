import { productModel } from "../../models/Product";
import { BaseController } from "./BaseController";


export class ProductController extends BaseController {
    constructor(){
        return super(productModel);
    }
}