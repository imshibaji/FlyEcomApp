import { Router } from "express";
import { userReviewModel } from "../../models/UserReview";


export class UserReviewController {
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
        const user_reviews = await userReviewModel.all();
        res.json(user_reviews);
    }

    async single(req, res){
        const user_reviews = await userReviewModel.find(req.params.id);
        res.json(user_reviews);
    }

    async save(req, res){
        const data = req.body;
        const id = await userReviewModel.create(data);
        if(id) {
            return res.redirect('/user_reviews');
        }
        res.redirect('/user_reviews/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userReviewModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_reviews');
        }
        res.redirect('/user_reviews/edit');
    }

    async delete(req, res){
        const id = await userReviewModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_reviews');
        }
        res.redirect('/user_reviews');
    }

}