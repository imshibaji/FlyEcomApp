import { Router } from "express";
import { settingModel } from "../../models/Setting";


export class SettingController {
    constructor(){
        const route = Router();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }

    async list(req, res){
        const settings = await settingModel.all();
        res.json(settings);
    }

    async single(req, res){
        const setting = await settingModel.find(req.params.id);
        res.json(setting);
    }

    async save(req, res){
        const data = req.body;
        const id = await settingModel.create(data);
        if(id) {
            return res.redirect('/settings');
        }
        res.redirect('/settings/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await settingModel.update(data.id, data);
        if(id) {
            return res.redirect('/settings');
        }
        res.redirect('/settings/edit');
    }

    async delete(req, res){
        const id = await settingModel.delete(req.params.id);
        if(id) {
            return res.redirect('/settings');
        }
        res.redirect('/settings');
    }

}