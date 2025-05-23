import { Router } from "express";
import { orderModel } from "../../models/Order";

export class OrderController {
    constructor(){
        const route = Router();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete)
        return route;
    }


async list(req,res){
    const orders = await orderModel.all()
    res.json(orders)
}

async single(req,res){
    const order = await orderModel.find(req.params.id)
    res.json(order)
}

async save(req,res){
    const data = req.body;
    const id = await orderModel.create(data);
    if(id){
        return res.redirect('/orders')
    }
    res.redirect('/orders/create')
}

async update(req, res){
    const data = req.body;
    const id = await orderModel.update(data.id, data);
    if(id){
        return res.redirect('/orders')
    }
    res.redirect('/orders/edit')
}

async delete(req,res){
    const id = await orderModel.delete(req.params.id);
    if(id){
        return res.redirect('/orders')
    }
    res.redirect('/orders')
}
}