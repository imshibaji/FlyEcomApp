import { Router } from "express";
import multer from "multer";
const upload = multer({ dest: 'public/uploads/' });
export class BaseController {
    constructor(fileName='image'){
        const route = Router();
        route.get('/', this.list);
        route.get('/show/:id', this.show);
        route.get('/create', this.create);
        route.post('/',upload.single(fileName), this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update',upload.single(fileName), this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }
    async list(){}
    async show(){}
    async create(){}
    async save(){}
    async edit(){}
    async update(){}
    async delete(){}
}