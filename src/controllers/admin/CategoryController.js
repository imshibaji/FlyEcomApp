import { categoryModel } from "../../models/Category";
import { BaseController } from "./BaseController";

export default class CategoryController extends BaseController{

    async list(req, res){
        const categories = await categoryModel.all();
        req.session.flash = 'Categories';
        res.render('admin/categories/index', {categories, title: 'Categories Section'});
    }

    async show(req, res){
        const category = await categoryModel.find(req.params.id);
        res.render('admin/categories/show', {category, title: 'Category Details'});
    }

    async create(req, res){
        res.render('admin/categories/create', {title: 'Create category'});
    }

    async save(req, res){
        const product = req.body;
        await categoryModel.create(product);
        res.redirect('/admin/categories');
    }

    async edit(req, res){
        const category = await categoryModel.find(req.params.id);
        res.render('admin/categories/edit', {category, title: 'Edit Category'});
    }

    async update(req, res){
        const category = req.body;
        await categoryModel.update(category.id, category);
        res.redirect('/admin/categories');
    }

    async delete(req, res){
        await categoryModel.delete(req.params.id);
        res.redirect('/admin/categories');
    }

}