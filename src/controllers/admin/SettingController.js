import { Router } from "express";
import { setting } from "../../models/Setting";

export default class SettingController{
    constructor(){
        const route = Router();
        route.get('/', this.index);
        route.post('/', this.save);
        route.get('/edit', this.edit);
        route.post('/update', this.update);
        route.post('/delete', this.delete);
        return route;
    }

    async index(req, res){

        res.render('admin/setting/index', {
            title: 'Setting',
            settings: await setting.all()
        });
    }
    save(req, res){
        res.render('admin/setting/index', {
            title: 'Setting'
        });
    }
    edit(req, res){
        res.render('admin/setting/index', {
            title: 'Setting Edit'
        });
    }
    update(req, res){
        res.render('admin/setting/index', {
            title: 'Setting Edit'
        });
    }
    delete(req, res){
        res.render('admin/setting/index', {
            title: 'Setting Delete'
        });
    }
}