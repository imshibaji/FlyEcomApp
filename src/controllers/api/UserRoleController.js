import { Router } from "express";
import { userRoleModel } from "../../models/UserRole";


export class UserRoleController {
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
        const userRoles = await userRoleModel.all();
        res.json(userRoles);
    }

    async single(req, res){
        const userRole = await userRoleModel.find(req.params.id);
        res.json(userRole);
    }

    async save(req, res){
        const data = req.body;
        const id = await userRoleModel.create(data);
        if(id) {
            return res.redirect('/userRoles');
        }
        res.redirect('/userRoles/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userRoleModel.update(data.id, data);
        if(id) {
            return res.redirect('/userRoles');
        }
        res.redirect('/userRoles/edit');
    }

    async delete(req, res){
        const id = await userRoleModel.delete(req.params.id);
        if(id) {
            return res.redirect('/userRoles');
        }
        res.redirect('/userRoles');
    }

}