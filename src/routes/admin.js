import { Router } from "express";
import UserController from "../controllers/admin/UserController";
import OrderController from "../controllers/admin/OrderController";
import ProductController from "../controllers/admin/ProductController";
import CategoryController from "../controllers/admin/CategoryController";
import MenuController from "../controllers/admin/MenuController";
import SettingController from "../controllers/admin/SettingController";

const route = Router();

route.get('/', function(req, res){
    res.render('admin/index');
});
route.get('/pages', function(req, res){
    res.render('admin/pages/index');
});
route.get('/posts', function(req, res){
    res.render('admin/posts/index');
});
route.use('/menu', new MenuController());
route.use('/categories', new CategoryController());
route.use('/products', new ProductController());
route.use('/orders', new OrderController());
route.use('/users', new UserController());
route.use('/settings', new SettingController());

export default route;