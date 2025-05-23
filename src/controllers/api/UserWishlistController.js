import { Router } from "express";
import { userWishlistModel } from "../../models/UserWishlist";


export class UserWishlistController {
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
        const user_wishlists = await userWishlistModel.all();
        res.json(user_wishlists);
    }

    async single(req, res){
        const user_wishlist = await userWishlistModel.find(req.params.id);
        res.json(user_wishlist);
    }

    async save(req, res){
        const data = req.body;
        const id = await userWishlistModel.create(data);
        if(id) {
            return res.redirect('/user_wishlists');
        }
        res.redirect('/user_wishlists/create');
    }

    async update(req, res){
        const data = req.body;
        const id = await userWishlistModel.update(data.id, data);
        if(id) {
            return res.redirect('/user_wishlists');
        }
        res.redirect('/user_wishlists/edit');
    }

    async delete(req, res){
        const id = await userWishlistModel.delete(req.params.id);
        if(id) {
            return res.redirect('/user_wishlists');
        }
        res.redirect('/user_wishlists');
    }

}