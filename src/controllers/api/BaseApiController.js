import { Router } from "express";
import multer from "multer";
import fs from 'fs';
const upload = multer({ dest: 'public/uploads/' });
let model = 'users';
export class BaseApiController {
    constructor(model,fileName='image'){
        this.model = require(`../../models/${model}`)('users');
        const route = Router();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/',upload.single(fileName), this.save);
        route.put('/update/:id',upload.single(fileName), this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res){
        // console.log(this.model);
        const carts = await this.model.all();
        return res.json(carts);
    }

    async single(req, res){
        const cart = await this.model.find(req.params.id);
        res.json(cart);
    }

    async save(req, res){
        const data = req.body;
        if(req.file){
            data.image = req.file.filename;
        }
        const savedData = await this.model.create(data);
        if(savedData) {
            return res.json({
                success: true,
                data: savedData
            });
        }
        res.json({
            success: false,
            data: savedData,
            error: 'Error',
        });
    }

    async update(req, res){
        const data = req.body;
        const img = req.file;
        if(img){
            const oneData = await this.model.find(req.body.id);
            if(oneData.image && fs.existsSync('public/uploads/' + oneData.image)){
                fs.unlinkSync('public/uploads/' + oneData.image);
            }
            data.image = img.filename;
        }
        const updatedData = await this.model.update(data.id, data);
        if(updatedData) {
            return res.json({
                success: true,
                data: updatedData
            });
        }
        res.json({
            success: false,
            data: updatedData,
            error: 'Error',
        });
    }

    async delete(req, res){
        const deletedData = await this.model.delete(req.params.id);
        if(deletedData.image && fs.existsSync('public/uploads/' + deletedData.image)){
            fs.unlinkSync('public/uploads/' + deletedData.image);
        }
        if(deletedData) {
            return res.json({
                success: true,
                data: deletedData
            });
        }
        res.json({
            success: false,
            data: deletedData,
            error: 'Error',
        });
    }
}