import { Router } from "express";
import { menuModel } from "../../models/Menu";

export default class MenuController{
    constructor(){
        const route = Router();
        route.get('/', this.list);
        route.get('/show/:id', this.show);
        route.get('/create', this.create);
        route.post('/', this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }

    async list(req, res){
        const menus = await menuModel.all();
        res.render('admin/menus/index', {menus, title: 'Menus Section'});
    }

    async show(req, res){
        const menu = await menuModel.find(req.params.id);
        res.render('admin/menus/show', {menu, title: 'Menu Details'});
    }

    async create(req, res){
        res.render('admin/menus/create', {title: 'Create Menu'});
    }

    async save(req, res){
        const menu = req.body;
        await menuModel.create(menu);
        res.redirect('/admin/menus');
    }

    async edit(req, res){
        const menu = await menuModel.find(req.params.id);
        res.render('admin/menus/edit', {menu, title: 'Edit Menu'});
    }

    async update(req, res){
        const menu = req.body;
        await menuModel.update(menu.id, menu);
        res.redirect('/admin/menus');
    }

    async delete(req, res){
        await menuModel.delete(req.params.id);
        res.redirect('/admin/menus');
    }

}