import { orderModel } from "../../models/Order.js";
import { BaseController } from "./BaseController.js";
export default class OrderController extends BaseController{
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }

    async list(req, res){
        const orders = await orderModel.all();
        res.render('admin/orders/index', {orders, title: 'Orders Section'});
    }

    async show(req, res){
        const order = await orderModel.find(req.params.id);
        res.render('admin/orders/show', {order, title: 'Order Details'});
    }

    async create(req, res){
        res.render('admin/orders/create', {title: 'Create Order'});
    }

    async save(req, res){
        const order = req.body;
        const img = req.file;
        console.log(img);
        
        delete order.image;
        await orderModel.create(order);
        res.redirect('/admin/orders');
    }

    async edit(req, res){
        const order = await orderModel.find(req.params.id);
        res.render('admin/orders/edit', {order, title: 'Edit Order'});
    }

    async update(req, res){
        const order = req.body;
        const img = req.file;
        console.log(img);
        delete order.image;
        await orderModel.update(order.id, order);
        res.redirect('/admin/orders');
    }

    async delete(req, res){
        await orderModel.delete(req.params.id);
        res.redirect('/admin/orders');
    }

}