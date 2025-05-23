import { Router } from "express";
import { menuModel } from "../../models/Menu";

export class MenuController {

    constructor(){
        const route = Router();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/',this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;  
    }

    async list(req, res){
          const menus = await menuModel.all();
        res.json(menus);
    }       

    async single(req, res){
        const menu =await menuModel.all()
        res.json(menu);
    }

    async save(req, res){
          const data = req.body;
                const id = await menuModel.create(data);
                if(id) {
                    return res.redirect('/menus');
                }
                res.redirect('/menus/create');
    }

     async update(req, res){
            const data = req.body;
            const id = await menuModel.update(data.id, data);
            if(id) {
                return res.redirect('/menus');
            }
            res.redirect('/menus/edit');
        }
    
        async delete(req, res){
            const id = await menuModel.delete(req.params.id);
            if(id) {
                return res.redirect('/menus');
            }
            res.redirect('/menus');
        }
}