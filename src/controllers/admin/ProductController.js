import { productModel } from "../../models/Product.js";
import fs from 'fs';
import { BaseController } from "./BaseController.js";

export default class ProductController extends BaseController{
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', upload.single('image'), this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', upload.single('image'),this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }

    async list(req, res){
        const products = await productModel.all();
        req.session.flash = 'Products';
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
        if(req.file){
            product.image = req.file.filename;
        }
        await productModel.create(product);
        res.redirect('/admin/products');
    }

    async edit(req, res){
        const product = await productModel.find(req.params.id);
        res.render('admin/products/edit', {product, title: 'Edit Product'});
    }

    async update(req, res){
        const product = req.body;
        const img = req.file;
        if(img){
            const productData = await productModel.find(req.body.id);
            if(productData.image && fs.existsSync('public/uploads/' + productData.image)){
                fs.unlinkSync('public/uploads/' + productData.image);
            }
            product.image = img.filename;
        }
        await productModel.update(product.id, product);
        res.redirect('/admin/products');
    }

    async delete(req, res){
        const productData = await productModel.find(req.params.id);
        if(productData.image && fs.existsSync('public/uploads/' + productData.image)){
            fs.unlinkSync('public/uploads/' + productData.image);
        }
        await productModel.delete(req.params.id);
        res.redirect('/admin/products');
    }

}