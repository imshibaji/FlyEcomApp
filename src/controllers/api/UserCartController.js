import { Router } from "express";
import { userCartModel } from "../../models/UserCart";


export class UserCartController {
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
        const user_carts = await userCartModel.all();
        res.json(user_carts);
    }

    async single(req, res){
        const user_cart = await userCartModel.find(req.params.id);
        res.json(user_cart);
    }

    async save(req, res){
        const data = req.body;
        const id = await userCartModel.create(data);
        if(id) {
            return res.redirect('/user_carts');
        }
        res.redirect('/user_carts/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userCartModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_carts');
        }
        res.redirect('/user_carts/edit');
    }

    async delete(req, res){
        const id = await userCartModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_carts');
        }
        res.redirect('/user_carts');
    }

}