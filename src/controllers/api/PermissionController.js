import {Router} from "express";
import {permissionModel} from "../../models/Permission";

export class PermissionController {
  
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
        const data = await permissionModel.all();
        return res.json(data);
    }

    async single(req,res){
        const data = await permissionModel.single(req.params.id);
        return res.json(data);
    }

    async save(req,res){
        const data = req.body;
        const id = await permissionModel.create(data);
        if(id){
            return res.redirect('/permissions')
        }
        res.redirect('/permissions/create')
    }

    async update(req, res){
        const data = req.body;
        const id = await permissionModel.update(data.id, data);
        if(id){
            return res.redirect('/permissions')
        }
        res.redirect('/permissions/edit')
    }    

    async delete(req, res){
        const id = await permissionModel.delete(req.params.id);
        if(id){
            return res.redirect('/permissions')
        }
        res.redirect('/permissions')
    }
}