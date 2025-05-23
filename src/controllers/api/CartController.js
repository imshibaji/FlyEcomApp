import { Router } from "express";
import { cartModel } from "../../models/Cart";


export class CartController {
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
        const carts = await cartModel.all();
        res.json(carts);
    }

    async single(req, res){
        const cart = await cartModel.find(req.params.id);
        res.json(cart);
    }

    async save(req, res){
        const data = req.body;
        const id = await cartModel.create(data);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await cartModel.update(data.id, data);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts/edit');
    }

    async delete(req, res){
        const id = await cartModel.delete(req.params.id);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts');
    }

}