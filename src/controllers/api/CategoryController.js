import { categoryModel} from "../../models/Category";
import BaseController from "../BaseController";


export class CategoryController extends BaseController{
constructor(){
    super(categoryModel, 'categories',
         {title: 'Category',
            asApi: true}
        ) } 

}