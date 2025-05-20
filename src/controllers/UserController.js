import { Router } from "express";
// import db from "../dbcon";
import { userModel } from "../models/User";

export default class UserController{
    constructor(){
            const route = Router();
            route.get('/', this.list);
            route.get('/create', this.create);
            route.post('/', this.save);
            route.get('/edit/:id', this.edit);
            route.post('/update', this.update);
            route.post('/delete/:id', this.delete);
            return route;
    }
    async list(req, res) {
        const users = await userModel.all();
        // const users = await db('users').select('*');
        res.render('users/list', {
            title: 'Users',
            users
        });
    }
    async create(req, res) {
        res.render('users/create', {
            title: 'Create User'
        });
    }
    async save(req, res) {
        const data = req.body;
        console.log(data);
        
        const id = await userModel.create(data);
        if(id) {
            return res.redirect('/users');
        }
        res.redirect('/users/create');
    }
    async edit(req, res) {
        const data = await userModel.find(req.params.id);
        // console.log(data);
        
        res.render('users/edit', {
            title: 'Edit User',
            user: data
        });
    }
    async update(req, res) {
        const data = req.body;
        // const id = await db('users').update(user).where('id', user.id);
        const id = await userModel.update(data.id, data);
        if(id) {
            return res.redirect('/users');
        }
        res.redirect('/users/edit');
    }

    async delete(req, res) {
        // const id = await db('users').where('id', req.params.id).del();
        const id = await userModel.delete(req.params.id);
        if(id) {
            return res.redirect('/users');
        }
        res.redirect('/users');
    }
}