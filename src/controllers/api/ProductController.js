import { Router } from "express";
import { productModel } from "../../models/Product";


export class ProductController {
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
        const products = await productModel.all();
        res.json(products);
    }

    async single(req, res){
        const product = await productModel.find(req.params.id);
        res.json(product);
    }

    async save(req, res){
        const data = req.body;
        const id = await productModel.create(data);
        if(id) {
            return res.redirect('/products');
        }
        res.redirect('/products/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await productModel.update(data.id, data);
        if(id) {
            return res.redirect('/products');
        }
        res.redirect('/products/edit');
    }

    async delete(req, res){
        const id = await productModel.delete(req.params.id);
        if(id) {
            return res.redirect('/products');
        }
        res.redirect('/products');
    }

}