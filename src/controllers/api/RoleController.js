import { Router } from "express";
import { roleModel } from "../../models/Role";


export class RoleController {
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
        const roles = await roleModel.all();
        res.json(roles);
    }

    async single(req, res){
        const role = await roleModel.find(req.params.id);
        res.json(role);
    }

    async save(req, res){
        const data = req.body;
        const id = await roleModel.create(data);
        if(id) {
            return res.redirect('/roles');
        }
        res.redirect('/roles/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await roleModel.update(data.id, data);
        if(id) {
            return res.redirect('/roles');
        }
        res.redirect('/roles/edit');
    }

    async delete(req, res){
        const id = await roleModel.delete(req.params.id);
        if(id) {
            return res.redirect('/roles');
        }
        res.redirect('/roles');
    }

}