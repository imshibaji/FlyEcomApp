import { Router } from "express";
import multer from "multer";
import fs from 'fs';
const upload = multer({ dest: 'public/uploads/' });


export class Controller {
    constructor(modelObject,fileName='image'){
        const route = Router();
        route.get('/', (req, res, next)=>{
            this.model = modelObject;
            this.list(req, res, next);
        });
        route.get('/:id', (req, res, next)=>{
            this.model = modelObject;
            this.single(req, res, next);
        });
        route.post('/',upload.single(fileName), (req, res, next)=>{
            this.model = modelObject;
            this.save(req, res, next);
        });
        route.put('/update/:id',upload.single(fileName), (req, res, next)=>{
            this.model = modelObject;
            this.update(req, res, next);
        });
        route.delete('/:id', (req, res, next)=>{
            this.model = modelObject;
            this.delete(req, res, next);
        });
        return route;
    }
    async list(req, res){
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
            const data = await this.model.find(savedData[0]);
            return res.json({
                success: true,
                data: data
            });
        }
        res.json({
            success: false,
            error: 'Error: Data not inserted.',
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
            const data = await this.model.find(updatedData);
            return res.json({
                success: true,
                data: data
            });
        }
        res.json({
            success: false,
            error: 'Error: data not updated.',
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
            error: 'Error',
        });
    }
}