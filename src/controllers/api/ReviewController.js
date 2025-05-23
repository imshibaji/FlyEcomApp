import { Router } from "express";
import { reviewModel } from "../../models/Review";


export class ReviewController {
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
        const reviews = await reviewModel.all();
        res.json(reviews);
    }

    async single(req, res){
        const review = await reviewModel.find(req.params.id);
        res.json(review);
    }

    async save(req, res){
        const data = req.body;
        const id = await reviewModel.create(data);
        if(id) {
            return res.redirect('/reviews');
        }
        res.redirect('/reviews/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await reviewModel.update(data.id, data);
        if(id) {
            return res.redirect('/reviews');
        }
        res.redirect('/reviews/edit');
    }

    async delete(req, res){
        const id = await reviewModel.delete(req.params.id);
        if(id) {
            return res.redirect('/reviews');
        }
        res.redirect('/reviews');
    }

}