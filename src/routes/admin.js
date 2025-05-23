import { Router } from "express";

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
route.get('/orders', function(req, res){
    res.render('admin/orders/index');
});
route.get('/products', function(req, res){
    res.render('admin/products/index');
});
route.get('/users', function(req, res){
    res.render('admin/users/index');
});

export default route;