import { Router } from "express";
import { postModel } from "../../models/Post";


export class PostController {
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
        const posts = await postModel.all();
        res.json(posts);
    }

    async single(req, res){
        const post = await postModel.find(req.params.id);
        res.json(post);
    }

    async save(req, res){
        const data = req.body;
        const id = await postModel.create(data);
        if(id) {
            return res.redirect('/posts');
        }
        res.redirect('/posts/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await postModel.update(data.id, data);
        if(id) {
            return res.redirect('/posts');
        }
        res.redirect('/posts/edit');
    }

    async delete(req, res){
        const id = await postModel.delete(req.params.id);
        if(id) {
            return res.redirect('/posts');
        }
        res.redirect('/posts');
    }

}