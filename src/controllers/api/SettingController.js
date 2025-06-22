import { settingModel } from "../../models/Setting";
import BaseController from "../BaseController";


export class SettingController extends BaseController{
    constructor(){
        super(settingModel, 'settings',{
            title: 'Setting',
            asApi: true
        });
    }
}