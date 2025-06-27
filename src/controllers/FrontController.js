import { Router } from "express";

export default class FrontController{
    constructor(){
        const route = Router();
        route.get('/', this.home);
        route.get('/about', this.about);
        route.get('/contact', this.contact);
        return route;
    }

    home(req, res){
        req.session.flash = 'Home Page';
        res.render('index', {
            title: 'My App'
        });
    }

    about(req, res){
        req.session.flash = 'About Page';
        res.render('index',{
            title: 'About'
        });
    }

    contact(req, res){
        req.session.flash = 'Contact Page';
        res.render('index',{
            title: 'Contact'
        });
    }

    async users(req, res){
        const users = await db.select('*').from('users');
        res.render('users/list',{
            users,
            title: 'Users'
        });
    }

}