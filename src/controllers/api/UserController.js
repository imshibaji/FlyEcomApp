import { userModel } from "../../models/User";
import BaseController from "../BaseController";
// import { BaseController } from "./BaseController";


export class UserController extends BaseController {

    constructor(){
        super(userModel, 'users', {
            title: 'User',
            // viewPrefix: 'api',
            asApi: true
        });
    }

    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/:id', this.single);
    //     route.post('/', this.save);
    //     route.put('/update/:id', this.update);
    //     route.delete('/:id', this.delete);
    //     return route;
    // }

    // async list(req, res){
    //     const users = (await userModel.all()).map(user => {
    //         return {
    //             ...user,
    //             checked: true
    //         }
    //     });
    //     res.json(users);
    // }

    // async single(req, res){
    //     const user = await userModel.find(req.params.id);
    //     res.json(user);
    // }

    // async save(req, res){
    //     const data = req.body;
    //     const id = await userModel.create(data);
    //     if(id) {
    //         return res.redirect('/users');
    //     }
    //     res.redirect('/users/create');
    // }

    // async update(req, res){
    //     const data = req.body;
    //     const id = await userModel.update(data.id, data);
    //     if(id) {
    //         return res.redirect('/users');
    //     }
    //     res.redirect('/users/edit');
    // }

    // async delete(req, res){
    //     const id = await userModel.delete(req.params.id);
    //     if(id) {
    //         return res.redirect('/users');
    //     }
    //     res.redirect('/users');
    // }

}