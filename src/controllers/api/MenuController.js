import { menuModel } from "../../models/Menu";
import BaseController from "../BaseController";

export class MenuController extends BaseController {
    constructor() {
        super(menuModel,'menus',
            {
                title:'Menu',
                asApi:true
            }
        );
    }
}

   