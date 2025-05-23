import { Router } from "express";
import { categoryModel} from "../../models/Category";


export class CategoryController {
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
        const carts = await categoryModel.all();
        res.json(carts);
    }

    async single(req, res){
        const cart = await categoryModel.find(req.params.id);
        res.json(cart);
    }

    async save(req, res){
        const data = req.body;
        const id = await categoryModel.create(data);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await categoryModel.update(data.id, data);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts/edit');
    }

    async delete(req, res){
        const id = await categoryModel.delete(req.params.id);
        if(id) {
            return res.redirect('/carts');
        }
        res.redirect('/carts');
    }

}