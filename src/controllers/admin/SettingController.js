import { settingModel } from "../../models/Setting";
import { BaseController } from "./BaseController";

export default class SettingController extends BaseController{
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.index);
    //     route.post('/', this.save);
    //     route.get('/edit', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete', this.delete);
    //     return route;
    // }

    async list(req, res){
        res.render('admin/settings/index', {
            title: 'Setting',
            settings: await settingModel.all()
        });
    }
    save(req, res){
        res.render('admin/settings/index', {
            title: 'Setting'
        });
    }
    edit(req, res){
        res.render('admin/settings/index', {
            title: 'Setting Edit'
        });
    }
    update(req, res){
        res.render('admin/settings/index', {
            title: 'Setting Edit'
        });
    }
    delete(req, res){
        res.render('admin/settings/index', {
            title: 'Setting Delete'
        });
    }
}