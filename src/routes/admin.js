import { Router } from "express";
import UserController from "../controllers/admin/UserController";
import OrderController from "../controllers/admin/OrderController";
import ProductController from "../controllers/admin/ProductController";

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

route.use('/products', new ProductController());
route.use('/orders', new OrderController());
route.use('/users', new UserController());

export default route;