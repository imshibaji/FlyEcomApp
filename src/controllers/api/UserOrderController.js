import { Router } from "express";
import { userOrderModel } from "../../models/UserOrder";


export class UserOrderController {
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
        const user_orders = await userOrderModel.all();
        res.json(user_orders);
    }

    async single(req, res){
        const user_order = await userOrderModel.find(req.params.id);
        res.json(user_order);
    }

    async save(req, res){
        const data = req.body;
        const id = await userOrderModel.create(data);
        if(id) {
            return res.redirect('/user_orders');
        }
        res.redirect('/user_orders/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userOrderModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_orders');
        }
        res.redirect('/user_orders/edit');
    }

    async delete(req, res){
        const id = await userOrderModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_orders');
        }
        res.redirect('/user_orders');
    }

}