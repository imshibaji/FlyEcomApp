import { Router } from "express";
import { userPaymentModel } from "../../models/UserPayment";


export class UserPaymentController {
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
        const user_payments = await userPaymentModel.all();
        res.json(user_payments);
    }

    async single(req, res){
        const user_payment = await userPaymentModel.find(req.params.id);
        res.json(user_payment);
    }

    async save(req, res){
        const data = req.body;
        const id = await userPaymentModel.create(data);
        if(id) {
            return res.redirect('/user_payments');
        }
        res.redirect('/user_payments/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userPaymentModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_payments');
        }
        res.redirect('/user_payments/edit');
    }

    async delete(req, res){
        const id = await userPaymentModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_payments');
        }
        res.redirect('/user_payments');
    }

}