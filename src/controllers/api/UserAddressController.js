import { Router } from "express";
import { userAddressModel } from "../../models/UserAddress";


export class UserAddressController {
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
        const user_addresses = await userAddressModel.all();
        res.json(user_addresses);
    }

    async single(req, res){
        const user_address = await userAddressModel.find(req.params.id);
        res.json(user_address);
    }

    async save(req, res){
        const data = req.body;
        const id = await userAddressModel.create(data);
        if(id) {
            return res.redirect('/user_addresses');
        }
        res.redirect('/user_addresses/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userAddressModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_addresses');
        }
        res.redirect('/user_addresses/edit');
    }

    async delete(req, res){
        const id = await userAddressModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_addresses');
        }
        res.redirect('/user_addresses');
    }

}