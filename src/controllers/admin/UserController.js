import { Router } from "express";
import { userModel } from "../../models/User.js";
import { BaseController } from "./BaseController.js";
export default class UserController extends BaseController{
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }

    async list(req, res){
        const users = await userModel.all();
        res.render('admin/users/index', {users, title: 'Users Section'});
    }

    async show(req, res){
        const user = await userModel.find(req.params.id);
        res.render('admin/users/show', {user, title: 'User Details'});
    }

    async create(req, res){
        res.render('admin/users/create', {title: 'Create User'});
    }

    async save(req, res){
        const user = req.body;
        const img = req.file;
        console.log(img);
        
        delete user.image;
        await userModel.create(user);
        res.redirect('/admin/users');
    }

    async edit(req, res){
        const user = await userModel.find(req.params.id);
        res.render('admin/users/edit', {user, title: 'Edit User'});
    }

    async update(req, res){
        const user = req.body;
        const img = req.file;
        console.log(img);
        delete user.image;
        await userModel.update(user.id, user);
        res.redirect('/admin/users');
    }

    async delete(req, res){
        await userModel.delete(req.params.id);
        res.redirect('/admin/users');
    }

}