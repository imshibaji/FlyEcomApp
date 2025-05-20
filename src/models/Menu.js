import { BaseModel } from "./base";

export class MenuModel extends BaseModel {
    constructor() {
        super('menus');
    }
}

export const menuModel = new MenuModel();