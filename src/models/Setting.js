import { BaseModel } from "./Base";

// class
export class SettingModel extends BaseModel{
    constructor() {
        super('settings');
    }
}

// object
export const settingModel = new SettingModel();