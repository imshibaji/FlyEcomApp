import multer from "multer";
import { Router } from "express";
import { productModel } from "../../models/Product.js";
const upload = multer({ dest: 'uploads/' });

export default class ProductController{
    constructor(){
        const route = Router();
        route.get('/', this.list);
        route.get('/show/:id', this.show);
        route.get('/create', this.create);
        route.post('/', upload.single('image'), this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }

    async list(req, res){
        const products = await productModel.all();
        res.render('admin/products/index', {products, title: 'Products Section'});
    }

    async show(req, res){
        const product = await productModel.find(req.params.id);
        res.render('admin/products/show', {product, title: 'Product Details'});
    }

    async create(req, res){
        res.render('admin/products/create', {title: 'Create product'});
    }

    async save(req, res){
        const product = req.body;
        // console.log(product);
        
        // delete product.image;/
        // product.image ='';
        await productModel.create(product);
        res.redirect('/admin/products');
    }

    async edit(req, res){
        const product = await productModel.find(req.params.id);
        res.render('admin/orders/edit', {product, title: 'Edit Product'});
    }

    async update(req, res){
        const product = req.body;
        const img = req.file;
        console.log(img);
        delete product.image;
        await productModel.update(product.id, product);
        res.redirect('/admin/products');
    }

    async delete(req, res){
        await productModel.delete(req.params.id);
        res.redirect('/admin/products');
    }

}