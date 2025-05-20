import { BaseModel } from "./base";

// class
export class SettingModel extends BaseModel{
    constructor() {
        super('settings');
    }
}

// object
export const settingModel = new SettingModel();