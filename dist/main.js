var $jHxPk$httperrors = require("http-errors");
var $jHxPk$express = require("express");
var $jHxPk$knex = require("knex");
var $jHxPk$multer = require("multer");
var $jHxPk$fs = require("fs");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



class $98f6272647c1a1a1$export$2e2bcd8739ae039 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.home);
        route.get('/about', this.about);
        route.get('/contact', this.contact);
        return route;
    }
    home(req, res) {
        res.render('index', {
            title: 'My App'
        });
    }
    about(req, res) {
        res.render('index', {
            title: 'About'
        });
    }
    contact(req, res) {
        res.render('index', {
            title: 'Contact'
        });
    }
    async users(req, res) {
        const users = await db.select('*').from('users');
        res.render('users/list', {
            users: users,
            title: 'Users'
        });
    }
}




// Update with your config settings.
/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */ var $bffe729ff46d6ac7$export$2e2bcd8739ae039 = {
    development: {
        client: 'sqlite3',
        connection: {
            filename: './database.db'
        }
    },
    staging: {
        client: 'mysql2',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'soumya'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    },
    production: {
        client: 'postgresql',
        connection: {
            host: '127.0.0.1',
            port: 3306,
            user: 'root',
            password: 'password',
            database: 'soumya'
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: 'knex_migrations'
        }
    }
};


const $f4d6ffff9c080495$var$db = (0, ($parcel$interopDefault($jHxPk$knex)))((0, $bffe729ff46d6ac7$export$2e2bcd8739ae039).development);
class $f4d6ffff9c080495$export$d12e20a4eec10acf {
    constructor(table){
        this.table = table;
    }
    getTable() {
        return this.table;
    }
    async all() {
        return await $f4d6ffff9c080495$var$db(this.table).select('*');
    }
    async find(id) {
        return await $f4d6ffff9c080495$var$db(this.table).select('*').where('id', id).first();
    }
    async create(data) {
        return await $f4d6ffff9c080495$var$db(this.table).insert(data);
    }
    async update(id, data) {
        // remove id
        if (data.id) delete data.id;
        return await $f4d6ffff9c080495$var$db(this.table).update(data).where('id', id);
    }
    async delete(id) {
        return await $f4d6ffff9c080495$var$db(this.table).where('id', id).del();
    }
}
function $f4d6ffff9c080495$export$2e2bcd8739ae039(table) {
    return new $f4d6ffff9c080495$export$d12e20a4eec10acf(table);
}


class $6940ec5fd6934666$export$621c2e9225361608 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('users');
    }
}
const $6940ec5fd6934666$export$54582e7b17f0fab7 = new $6940ec5fd6934666$export$621c2e9225361608();


class $4a8609086f4d1328$export$2e2bcd8739ae039 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/create', this.create);
        route.post('/', this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const users = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).all();
        // const users = await db('users').select('*');
        res.render('users/list', {
            title: 'Users',
            users: users
        });
    }
    async create(req, res) {
        res.render('users/create', {
            title: 'Create User'
        });
    }
    async save(req, res) {
        const data = req.body;
        console.log(data);
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).create(data);
        if (id) return res.redirect('/users');
        res.redirect('/users/create');
    }
    async edit(req, res) {
        const data = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).find(req.params.id);
        // console.log(data);
        res.render('users/edit', {
            title: 'Edit User',
            user: data
        });
    }
    async update(req, res) {
        const data = req.body;
        // const id = await db('users').update(user).where('id', user.id);
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).update(data.id, data);
        if (id) return res.redirect('/users');
        res.redirect('/users/edit');
    }
    async delete(req, res) {
        // const id = await db('users').where('id', req.params.id).del();
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).delete(req.params.id);
        if (id) return res.redirect('/users');
        res.redirect('/users');
    }
}








const $8b79f9334e82c016$var$upload = (0, ($parcel$interopDefault($jHxPk$multer)))({
    dest: 'public/uploads/'
});
class $8b79f9334e82c016$export$17d6b2f1e5ea211e {
    constructor(modelObject, fileName = 'image'){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', (req, res, next)=>{
            this.model = modelObject;
            this.list(req, res, next);
        });
        route.get('/:id', (req, res, next)=>{
            this.model = modelObject;
            this.single(req, res, next);
        });
        route.post('/', $8b79f9334e82c016$var$upload.single(fileName), (req, res, next)=>{
            this.model = modelObject;
            this.save(req, res, next);
        });
        route.put('/update/:id', $8b79f9334e82c016$var$upload.single(fileName), (req, res, next)=>{
            this.model = modelObject;
            this.update(req, res, next);
        });
        route.delete('/:id', (req, res, next)=>{
            this.model = modelObject;
            this.delete(req, res, next);
        });
        return route;
    }
    async list(req, res) {
        console.log(this.model);
        const carts = await this.model.all();
        return res.json(carts);
    }
    async single(req, res) {
        const cart = await this.model.find(req.params.id);
        res.json(cart);
    }
    async save(req, res) {
        const data = req.body;
        if (req.file) data.image = req.file.filename;
        const savedData = await this.model.create(data);
        if (savedData) return res.json({
            success: true,
            data: savedData
        });
        res.json({
            success: false,
            data: savedData,
            error: 'Error'
        });
    }
    async update(req, res) {
        const data = req.body;
        const img = req.file;
        if (img) {
            const oneData = await this.model.find(req.body.id);
            if (oneData.image && (0, ($parcel$interopDefault($jHxPk$fs))).existsSync('public/uploads/' + oneData.image)) (0, ($parcel$interopDefault($jHxPk$fs))).unlinkSync('public/uploads/' + oneData.image);
            data.image = img.filename;
        }
        const updatedData = await this.model.update(data.id, data);
        if (updatedData) return res.json({
            success: true,
            data: updatedData
        });
        res.json({
            success: false,
            data: updatedData,
            error: 'Error'
        });
    }
    async delete(req, res) {
        const deletedData = await this.model.delete(req.params.id);
        if (deletedData.image && (0, ($parcel$interopDefault($jHxPk$fs))).existsSync('public/uploads/' + deletedData.image)) (0, ($parcel$interopDefault($jHxPk$fs))).unlinkSync('public/uploads/' + deletedData.image);
        if (deletedData) return res.json({
            success: true,
            data: deletedData
        });
        res.json({
            success: false,
            data: deletedData,
            error: 'Error'
        });
    }
}


class $fa6ef553e520f090$export$8bd653a33461d337 extends (0, $8b79f9334e82c016$export$17d6b2f1e5ea211e) {
    constructor(){
        return super((0, $6940ec5fd6934666$export$54582e7b17f0fab7));
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
    //     const users = await userModel.all();
    //     res.json(users);
    // }
    // async single(req, res){
    //     const user = await userModel.find(req.params.id);
    //     res.json(user);
    // }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).create(data);
        if (id) return res.redirect('/users');
        res.redirect('/users/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).update(data.id, data);
        if (id) return res.redirect('/users');
        res.redirect('/users/edit');
    }
    async delete(req, res) {
        const id = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).delete(req.params.id);
        if (id) return res.redirect('/users');
        res.redirect('/users');
    }
}




class $6b5efad31e0a3718$export$ea9341ce97e15b96 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('carts');
    }
}
const $6b5efad31e0a3718$export$daf4f2b0193021e2 = new $6b5efad31e0a3718$export$ea9341ce97e15b96();


class $813b378725001ea2$export$41bd0aa259b8bd99 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const carts = await (0, $6b5efad31e0a3718$export$daf4f2b0193021e2).all();
        res.json(carts);
    }
    async single(req, res) {
        const cart = await (0, $6b5efad31e0a3718$export$daf4f2b0193021e2).find(req.params.id);
        res.json(cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $6b5efad31e0a3718$export$daf4f2b0193021e2).create(data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $6b5efad31e0a3718$export$daf4f2b0193021e2).update(data.id, data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $6b5efad31e0a3718$export$daf4f2b0193021e2).delete(req.params.id);
        if (id) return res.redirect('/carts');
        res.redirect('/carts');
    }
}




class $8091261fe36c502f$export$e1bbb50836aa0481 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('categories');
    }
}
const $8091261fe36c502f$export$a2705413a9011472 = new $8091261fe36c502f$export$e1bbb50836aa0481();


class $aa4801a539b99a08$export$b19455c5574c398e {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const carts = await (0, $8091261fe36c502f$export$a2705413a9011472).all();
        res.json(carts);
    }
    async single(req, res) {
        const cart = await (0, $8091261fe36c502f$export$a2705413a9011472).find(req.params.id);
        res.json(cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $8091261fe36c502f$export$a2705413a9011472).create(data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $8091261fe36c502f$export$a2705413a9011472).update(data.id, data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $8091261fe36c502f$export$a2705413a9011472).delete(req.params.id);
        if (id) return res.redirect('/carts');
        res.redirect('/carts');
    }
}




class $8b628231212397a7$export$99b67d04e1b65c9c extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('menus');
    }
}
const $8b628231212397a7$export$cc7cffe9e4be3b90 = new $8b628231212397a7$export$99b67d04e1b65c9c();


class $ba55ea5e542e86c0$export$c0716dcad1882e32 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const menus = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).all();
        res.json(menus);
    }
    async single(req, res) {
        const menu = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).all();
        res.json(menu);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).create(data);
        if (id) return res.redirect('/menus');
        res.redirect('/menus/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).update(data.id, data);
        if (id) return res.redirect('/menus');
        res.redirect('/menus/edit');
    }
    async delete(req, res) {
        const id = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).delete(req.params.id);
        if (id) return res.redirect('/menus');
        res.redirect('/menus');
    }
}




class $11739599f2302d66$export$d07d823ae64ba5bf extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('orders');
    }
}
const $11739599f2302d66$export$bbc4da2410d90f08 = new $11739599f2302d66$export$d07d823ae64ba5bf();


class $c9344336f11d44dc$export$36c71b95759fd255 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const orders = await (0, $11739599f2302d66$export$bbc4da2410d90f08).all();
        res.json(orders);
    }
    async single(req, res) {
        const order = await (0, $11739599f2302d66$export$bbc4da2410d90f08).find(req.params.id);
        res.json(order);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $11739599f2302d66$export$bbc4da2410d90f08).create(data);
        if (id) return res.redirect('/orders');
        res.redirect('/orders/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $11739599f2302d66$export$bbc4da2410d90f08).update(data.id, data);
        if (id) return res.redirect('/orders');
        res.redirect('/orders/edit');
    }
    async delete(req, res) {
        const id = await (0, $11739599f2302d66$export$bbc4da2410d90f08).delete(req.params.id);
        if (id) return res.redirect('/orders');
        res.redirect('/orders');
    }
}




class $25b3eb011bbff495$export$171c96e3ae1a825d extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('permissions');
    }
}
const $25b3eb011bbff495$export$31274c72f0ded6f7 = new $25b3eb011bbff495$export$171c96e3ae1a825d();


class $6627aca11ca979cb$export$f14414e4da36344a {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const data = await (0, $25b3eb011bbff495$export$31274c72f0ded6f7).all();
        return res.json(data);
    }
    async single(req, res) {
        const data = await (0, $25b3eb011bbff495$export$31274c72f0ded6f7).single(req.params.id);
        return res.json(data);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $25b3eb011bbff495$export$31274c72f0ded6f7).create(data);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $25b3eb011bbff495$export$31274c72f0ded6f7).update(data.id, data);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions/edit');
    }
    async delete(req, res) {
        const id = await (0, $25b3eb011bbff495$export$31274c72f0ded6f7).delete(req.params.id);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions');
    }
}




class $abd129b97241fa23$export$c043f710884189ad extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('posts');
    }
}
const $abd129b97241fa23$export$96ff8f02380ce42b = new $abd129b97241fa23$export$c043f710884189ad();


class $a35ab7828a468c73$export$c4018ffee86f7dfc {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const posts = await (0, $abd129b97241fa23$export$96ff8f02380ce42b).all();
        res.json(posts);
    }
    async single(req, res) {
        const post = await (0, $abd129b97241fa23$export$96ff8f02380ce42b).find(req.params.id);
        res.json(post);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $abd129b97241fa23$export$96ff8f02380ce42b).create(data);
        if (id) return res.redirect('/posts');
        res.redirect('/posts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $abd129b97241fa23$export$96ff8f02380ce42b).update(data.id, data);
        if (id) return res.redirect('/posts');
        res.redirect('/posts/edit');
    }
    async delete(req, res) {
        const id = await (0, $abd129b97241fa23$export$96ff8f02380ce42b).delete(req.params.id);
        if (id) return res.redirect('/posts');
        res.redirect('/posts');
    }
}




class $0b4d69264523ef33$export$f59d3de288812f26 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('products');
    }
}
const $0b4d69264523ef33$export$e7624ed1afe99528 = new $0b4d69264523ef33$export$f59d3de288812f26();


class $4d9d0d64fe0a6091$export$676eee9a3c69e247 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const products = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).all();
        res.json(products);
    }
    async single(req, res) {
        const product = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).find(req.params.id);
        res.json(product);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).create(data);
        if (id) return res.redirect('/products');
        res.redirect('/products/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).update(data.id, data);
        if (id) return res.redirect('/products');
        res.redirect('/products/edit');
    }
    async delete(req, res) {
        const id = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).delete(req.params.id);
        if (id) return res.redirect('/products');
        res.redirect('/products');
    }
}




class $ebfedc83af74c5f0$export$9b1c1b0ac848bd2a extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('reviews');
    }
}
const $ebfedc83af74c5f0$export$4a60180ddabce40 = new $ebfedc83af74c5f0$export$9b1c1b0ac848bd2a();


class $cd5bb691dacf1b6b$export$aab409ec1c4f7d58 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const reviews = await (0, $ebfedc83af74c5f0$export$4a60180ddabce40).all();
        res.json(reviews);
    }
    async single(req, res) {
        const review = await (0, $ebfedc83af74c5f0$export$4a60180ddabce40).find(req.params.id);
        res.json(review);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $ebfedc83af74c5f0$export$4a60180ddabce40).create(data);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $ebfedc83af74c5f0$export$4a60180ddabce40).update(data.id, data);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews/edit');
    }
    async delete(req, res) {
        const id = await (0, $ebfedc83af74c5f0$export$4a60180ddabce40).delete(req.params.id);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews');
    }
}




class $10ee3fa49c69394f$export$2eb7ddb3bece450d extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_carts');
    }
}
const $10ee3fa49c69394f$export$b777f5716fd5b8aa = new $10ee3fa49c69394f$export$2eb7ddb3bece450d();


class $562de31a5132ed57$export$85b16370280b2cde {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_carts = await (0, $10ee3fa49c69394f$export$b777f5716fd5b8aa).all();
        res.json(user_carts);
    }
    async single(req, res) {
        const user_cart = await (0, $10ee3fa49c69394f$export$b777f5716fd5b8aa).find(req.params.id);
        res.json(user_cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $10ee3fa49c69394f$export$b777f5716fd5b8aa).create(data);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $10ee3fa49c69394f$export$b777f5716fd5b8aa).update(data.id, data);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $10ee3fa49c69394f$export$b777f5716fd5b8aa).delete(req.params.id);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts');
    }
}




class $e434864bc5258e17$export$b3c0c1ee34ee93f7 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('roles');
    }
}
const $e434864bc5258e17$export$cc0c03fe32419b66 = new $e434864bc5258e17$export$b3c0c1ee34ee93f7();


class $32236da558198519$export$bbaba1d428ab2e6e {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const roles = await (0, $e434864bc5258e17$export$cc0c03fe32419b66).all();
        res.json(roles);
    }
    async single(req, res) {
        const role = await (0, $e434864bc5258e17$export$cc0c03fe32419b66).find(req.params.id);
        res.json(role);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $e434864bc5258e17$export$cc0c03fe32419b66).create(data);
        if (id) return res.redirect('/roles');
        res.redirect('/roles/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $e434864bc5258e17$export$cc0c03fe32419b66).update(data.id, data);
        if (id) return res.redirect('/roles');
        res.redirect('/roles/edit');
    }
    async delete(req, res) {
        const id = await (0, $e434864bc5258e17$export$cc0c03fe32419b66).delete(req.params.id);
        if (id) return res.redirect('/roles');
        res.redirect('/roles');
    }
}




class $12e3742b5595843d$export$11cff731c6a94280 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('settings');
    }
}
const $12e3742b5595843d$export$c02d22b8d9fe1446 = new $12e3742b5595843d$export$11cff731c6a94280();


class $7cae3dc6c65dec08$export$fd6acc083edcdaf2 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const settings = await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).all();
        res.json(settings);
    }
    async single(req, res) {
        const setting = await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).find(req.params.id);
        res.json(setting);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).create(data);
        if (id) return res.redirect('/settings');
        res.redirect('/settings/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).update(data.id, data);
        if (id) return res.redirect('/settings');
        res.redirect('/settings/edit');
    }
    async delete(req, res) {
        const id = await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).delete(req.params.id);
        if (id) return res.redirect('/settings');
        res.redirect('/settings');
    }
}




class $ff313923a453c1d3$export$7989d652f1503155 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_addresses');
    }
}
const $ff313923a453c1d3$export$56ff68ac21e4c288 = new $ff313923a453c1d3$export$7989d652f1503155();


class $62c048bde481f1d5$export$75bc3e97203775ec {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_addresses = await (0, $ff313923a453c1d3$export$56ff68ac21e4c288).all();
        res.json(user_addresses);
    }
    async single(req, res) {
        const user_address = await (0, $ff313923a453c1d3$export$56ff68ac21e4c288).find(req.params.id);
        res.json(user_address);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $ff313923a453c1d3$export$56ff68ac21e4c288).create(data);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $ff313923a453c1d3$export$56ff68ac21e4c288).update(data.id, data);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses/edit');
    }
    async delete(req, res) {
        const id = await (0, $ff313923a453c1d3$export$56ff68ac21e4c288).delete(req.params.id);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses');
    }
}




class $cd3d2a09d21b8821$export$cd2a2086bdf7df44 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_orders');
    }
}
const $cd3d2a09d21b8821$export$960506f80a268063 = new $cd3d2a09d21b8821$export$cd2a2086bdf7df44();


class $bb3bb2f104b5a1b7$export$7ca75f83100ec00f {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_orders = await (0, $cd3d2a09d21b8821$export$960506f80a268063).all();
        res.json(user_orders);
    }
    async single(req, res) {
        const user_order = await (0, $cd3d2a09d21b8821$export$960506f80a268063).find(req.params.id);
        res.json(user_order);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $cd3d2a09d21b8821$export$960506f80a268063).create(data);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $cd3d2a09d21b8821$export$960506f80a268063).update(data.id, data);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders/edit');
    }
    async delete(req, res) {
        const id = await (0, $cd3d2a09d21b8821$export$960506f80a268063).delete(req.params.id);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders');
    }
}




class $1e1e904f10d70431$export$8444034b029dced4 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_payments');
    }
}
const $1e1e904f10d70431$export$76caacbd651f024f = new $1e1e904f10d70431$export$8444034b029dced4();


class $b279d938de5a48c3$export$a57c4a96ea0b64b9 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_payments = await (0, $1e1e904f10d70431$export$76caacbd651f024f).all();
        res.json(user_payments);
    }
    async single(req, res) {
        const user_payment = await (0, $1e1e904f10d70431$export$76caacbd651f024f).find(req.params.id);
        res.json(user_payment);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $1e1e904f10d70431$export$76caacbd651f024f).create(data);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $1e1e904f10d70431$export$76caacbd651f024f).update(data.id, data);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments/edit');
    }
    async delete(req, res) {
        const id = await (0, $1e1e904f10d70431$export$76caacbd651f024f).delete(req.params.id);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments');
    }
}




class $f6ac1c07b2ef496c$export$ea55741716e07e69 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_reviews');
    }
}
const $f6ac1c07b2ef496c$export$13d41071d3344275 = new $f6ac1c07b2ef496c$export$ea55741716e07e69();


class $bac83d3e259d6b05$export$d3cb0d30dc2175d {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_reviews = await (0, $f6ac1c07b2ef496c$export$13d41071d3344275).all();
        res.json(user_reviews);
    }
    async single(req, res) {
        const user_reviews = await (0, $f6ac1c07b2ef496c$export$13d41071d3344275).find(req.params.id);
        res.json(user_reviews);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $f6ac1c07b2ef496c$export$13d41071d3344275).create(data);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $f6ac1c07b2ef496c$export$13d41071d3344275).update(data.id, data);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews/edit');
    }
    async delete(req, res) {
        const id = await (0, $f6ac1c07b2ef496c$export$13d41071d3344275).delete(req.params.id);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews');
    }
}




class $9f3f1bce95c31279$export$7466c2af0c0ecfc4 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_roles');
    }
}
const $9f3f1bce95c31279$export$1d2f884bd9889e1 = new $9f3f1bce95c31279$export$7466c2af0c0ecfc4();


class $da9a1715c1b83726$export$55c658694035bdef {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const userRoles = await (0, $9f3f1bce95c31279$export$1d2f884bd9889e1).all();
        res.json(userRoles);
    }
    async single(req, res) {
        const userRole = await (0, $9f3f1bce95c31279$export$1d2f884bd9889e1).find(req.params.id);
        res.json(userRole);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $9f3f1bce95c31279$export$1d2f884bd9889e1).create(data);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $9f3f1bce95c31279$export$1d2f884bd9889e1).update(data.id, data);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles/edit');
    }
    async delete(req, res) {
        const id = await (0, $9f3f1bce95c31279$export$1d2f884bd9889e1).delete(req.params.id);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles');
    }
}




class $148f0545ffb5fb54$export$bd9fc755e1e606b6 extends (0, $f4d6ffff9c080495$export$d12e20a4eec10acf) {
    constructor(){
        super('user_wishlists');
    }
}
const $148f0545ffb5fb54$export$26ccf2496e669201 = new $148f0545ffb5fb54$export$bd9fc755e1e606b6();


class $096d268fe87c4b45$export$f197b856d17b2798 {
    constructor(){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_wishlists = await (0, $148f0545ffb5fb54$export$26ccf2496e669201).all();
        res.json(user_wishlists);
    }
    async single(req, res) {
        const user_wishlist = await (0, $148f0545ffb5fb54$export$26ccf2496e669201).find(req.params.id);
        res.json(user_wishlist);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $148f0545ffb5fb54$export$26ccf2496e669201).create(data);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $148f0545ffb5fb54$export$26ccf2496e669201).update(data.id, data);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists/edit');
    }
    async delete(req, res) {
        const id = await (0, $148f0545ffb5fb54$export$26ccf2496e669201).delete(req.params.id);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists');
    }
}


const $6c1cd3ec0accd830$var$route = (0, $jHxPk$express.Router)();
$6c1cd3ec0accd830$var$route.use('/users', new (0, $fa6ef553e520f090$export$8bd653a33461d337)());
$6c1cd3ec0accd830$var$route.use('/carts', new (0, $813b378725001ea2$export$41bd0aa259b8bd99)());
$6c1cd3ec0accd830$var$route.use('/categories', new (0, $aa4801a539b99a08$export$b19455c5574c398e)());
$6c1cd3ec0accd830$var$route.use('/menus', new (0, $ba55ea5e542e86c0$export$c0716dcad1882e32)());
$6c1cd3ec0accd830$var$route.use('/orders', new (0, $c9344336f11d44dc$export$36c71b95759fd255)());
$6c1cd3ec0accd830$var$route.use('/permissions', new (0, $6627aca11ca979cb$export$f14414e4da36344a)());
$6c1cd3ec0accd830$var$route.use('/posts', new (0, $a35ab7828a468c73$export$c4018ffee86f7dfc)());
$6c1cd3ec0accd830$var$route.use('/products', new (0, $4d9d0d64fe0a6091$export$676eee9a3c69e247)());
$6c1cd3ec0accd830$var$route.use('/reviews', new (0, $cd5bb691dacf1b6b$export$aab409ec1c4f7d58)());
$6c1cd3ec0accd830$var$route.use('/roles', new (0, $32236da558198519$export$bbaba1d428ab2e6e)());
$6c1cd3ec0accd830$var$route.use('/settings', new (0, $7cae3dc6c65dec08$export$fd6acc083edcdaf2)());
$6c1cd3ec0accd830$var$route.use('/user_addresses', new (0, $62c048bde481f1d5$export$75bc3e97203775ec)());
$6c1cd3ec0accd830$var$route.use('/user_carts', new (0, $562de31a5132ed57$export$85b16370280b2cde)());
$6c1cd3ec0accd830$var$route.use('/user_orders', new (0, $bb3bb2f104b5a1b7$export$7ca75f83100ec00f)());
$6c1cd3ec0accd830$var$route.use('/user_payments', new (0, $b279d938de5a48c3$export$a57c4a96ea0b64b9)());
$6c1cd3ec0accd830$var$route.use('/user_reviews', new (0, $bac83d3e259d6b05$export$d3cb0d30dc2175d)());
$6c1cd3ec0accd830$var$route.use('/user_Roles', new (0, $da9a1715c1b83726$export$55c658694035bdef)());
$6c1cd3ec0accd830$var$route.use('/user_wishlists', new (0, $096d268fe87c4b45$export$f197b856d17b2798)());
var $6c1cd3ec0accd830$export$2e2bcd8739ae039 = $6c1cd3ec0accd830$var$route;







const $9f92d8a9eaff4307$var$upload = (0, ($parcel$interopDefault($jHxPk$multer)))({
    dest: 'public/uploads/'
});
class $9f92d8a9eaff4307$export$3b5bd9381a52554c {
    constructor(fileName = 'image'){
        const route = (0, $jHxPk$express.Router)();
        route.get('/', this.list);
        route.get('/show/:id', this.show);
        route.get('/create', this.create);
        route.post('/', $9f92d8a9eaff4307$var$upload.single(fileName), this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', $9f92d8a9eaff4307$var$upload.single(fileName), this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }
    async list() {}
    async show() {}
    async create() {}
    async save() {}
    async edit() {}
    async update() {}
    async delete() {}
}


class $cb2a9f93af049bd0$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }
    async list(req, res) {
        const users = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).all();
        res.render('admin/users/index', {
            users: users,
            title: 'Users Section'
        });
    }
    async show(req, res) {
        const user = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).find(req.params.id);
        res.render('admin/users/show', {
            user: user,
            title: 'User Details'
        });
    }
    async create(req, res) {
        res.render('admin/users/create', {
            title: 'Create User'
        });
    }
    async save(req, res) {
        const user = req.body;
        const img = req.file;
        console.log(img);
        delete user.image;
        await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).create(user);
        res.redirect('/admin/users');
    }
    async edit(req, res) {
        const user = await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).find(req.params.id);
        res.render('admin/users/edit', {
            user: user,
            title: 'Edit User'
        });
    }
    async update(req, res) {
        const user = req.body;
        const img = req.file;
        console.log(img);
        delete user.image;
        await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).update(user.id, user);
        res.redirect('/admin/users');
    }
    async delete(req, res) {
        await (0, $6940ec5fd6934666$export$54582e7b17f0fab7).delete(req.params.id);
        res.redirect('/admin/users');
    }
}




class $14c4b712a7937ece$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }
    async list(req, res) {
        const orders = await (0, $11739599f2302d66$export$bbc4da2410d90f08).all();
        res.render('admin/orders/index', {
            orders: orders,
            title: 'Orders Section'
        });
    }
    async show(req, res) {
        const order = await (0, $11739599f2302d66$export$bbc4da2410d90f08).find(req.params.id);
        res.render('admin/orders/show', {
            order: order,
            title: 'Order Details'
        });
    }
    async create(req, res) {
        res.render('admin/orders/create', {
            title: 'Create Order'
        });
    }
    async save(req, res) {
        const order = req.body;
        const img = req.file;
        console.log(img);
        delete order.image;
        await (0, $11739599f2302d66$export$bbc4da2410d90f08).create(order);
        res.redirect('/admin/orders');
    }
    async edit(req, res) {
        const order = await (0, $11739599f2302d66$export$bbc4da2410d90f08).find(req.params.id);
        res.render('admin/orders/edit', {
            order: order,
            title: 'Edit Order'
        });
    }
    async update(req, res) {
        const order = req.body;
        const img = req.file;
        console.log(img);
        delete order.image;
        await (0, $11739599f2302d66$export$bbc4da2410d90f08).update(order.id, order);
        res.redirect('/admin/orders');
    }
    async delete(req, res) {
        await (0, $11739599f2302d66$export$bbc4da2410d90f08).delete(req.params.id);
        res.redirect('/admin/orders');
    }
}





class $7a7e09a87be4d863$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', upload.single('image'), this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', upload.single('image'),this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }
    async list(req, res) {
        const products = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).all();
        res.render('admin/products/index', {
            products: products,
            title: 'Products Section'
        });
    }
    async show(req, res) {
        const product = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).find(req.params.id);
        res.render('admin/products/show', {
            product: product,
            title: 'Product Details'
        });
    }
    async create(req, res) {
        res.render('admin/products/create', {
            title: 'Create product'
        });
    }
    async save(req, res) {
        const product = req.body;
        // console.log(product);
        // delete product.image;/
        if (req.file) product.image = req.file.filename;
        await (0, $0b4d69264523ef33$export$e7624ed1afe99528).create(product);
        res.redirect('/admin/products');
    }
    async edit(req, res) {
        const product = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).find(req.params.id);
        res.render('admin/products/edit', {
            product: product,
            title: 'Edit Product'
        });
    }
    async update(req, res) {
        const product = req.body;
        const img = req.file;
        if (img) {
            const productData = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).find(req.body.id);
            if (productData.image && (0, ($parcel$interopDefault($jHxPk$fs))).existsSync('public/uploads/' + productData.image)) (0, ($parcel$interopDefault($jHxPk$fs))).unlinkSync('public/uploads/' + productData.image);
            product.image = img.filename;
        }
        await (0, $0b4d69264523ef33$export$e7624ed1afe99528).update(product.id, product);
        res.redirect('/admin/products');
    }
    async delete(req, res) {
        const productData = await (0, $0b4d69264523ef33$export$e7624ed1afe99528).find(req.params.id);
        if (productData.image && (0, ($parcel$interopDefault($jHxPk$fs))).existsSync('public/uploads/' + productData.image)) (0, ($parcel$interopDefault($jHxPk$fs))).unlinkSync('public/uploads/' + productData.image);
        await (0, $0b4d69264523ef33$export$e7624ed1afe99528).delete(req.params.id);
        res.redirect('/admin/products');
    }
}




class $9a11bc810c7bf81f$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    async list(req, res) {
        const categories = await (0, $8091261fe36c502f$export$a2705413a9011472).all();
        res.render('admin/categories/index', {
            categories: categories,
            title: 'Categories Section'
        });
    }
    async show(req, res) {
        const category = await (0, $8091261fe36c502f$export$a2705413a9011472).find(req.params.id);
        res.render('admin/categories/show', {
            category: category,
            title: 'Category Details'
        });
    }
    async create(req, res) {
        res.render('admin/categories/create', {
            title: 'Create category'
        });
    }
    async save(req, res) {
        const product = req.body;
        await (0, $8091261fe36c502f$export$a2705413a9011472).create(product);
        res.redirect('/admin/categories');
    }
    async edit(req, res) {
        const category = await (0, $8091261fe36c502f$export$a2705413a9011472).find(req.params.id);
        res.render('admin/categories/edit', {
            category: category,
            title: 'Edit Category'
        });
    }
    async update(req, res) {
        const category = req.body;
        await (0, $8091261fe36c502f$export$a2705413a9011472).update(category.id, category);
        res.redirect('/admin/categories');
    }
    async delete(req, res) {
        await (0, $8091261fe36c502f$export$a2705413a9011472).delete(req.params.id);
        res.redirect('/admin/categories');
    }
}




class $1ab8edb67f977a57$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.list);
    //     route.get('/show/:id', this.show);
    //     route.get('/create', this.create);
    //     route.post('/', this.save);
    //     route.get('/edit/:id', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete/:id', this.delete);
    //     return route;
    // }
    async list(req, res) {
        const menus = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).all();
        res.render('admin/menus/index', {
            menus: menus,
            title: 'Menus Section'
        });
    }
    async show(req, res) {
        const menu = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).find(req.params.id);
        res.render('admin/menus/show', {
            menu: menu,
            title: 'Menu Details'
        });
    }
    async create(req, res) {
        res.render('admin/menus/create', {
            title: 'Create Menu'
        });
    }
    async save(req, res) {
        const menu = req.body;
        await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).create(menu);
        res.redirect('/admin/menus');
    }
    async edit(req, res) {
        const menu = await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).find(req.params.id);
        res.render('admin/menus/edit', {
            menu: menu,
            title: 'Edit Menu'
        });
    }
    async update(req, res) {
        const menu = req.body;
        await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).update(menu.id, menu);
        res.redirect('/admin/menus');
    }
    async delete(req, res) {
        await (0, $8b628231212397a7$export$cc7cffe9e4be3b90).delete(req.params.id);
        res.redirect('/admin/menus');
    }
}




class $54d14ccb240b63c6$export$2e2bcd8739ae039 extends (0, $9f92d8a9eaff4307$export$3b5bd9381a52554c) {
    // constructor(){
    //     const route = Router();
    //     route.get('/', this.index);
    //     route.post('/', this.save);
    //     route.get('/edit', this.edit);
    //     route.post('/update', this.update);
    //     route.post('/delete', this.delete);
    //     return route;
    // }
    async list(req, res) {
        res.render('admin/settings/index', {
            title: 'Setting',
            settings: await (0, $12e3742b5595843d$export$c02d22b8d9fe1446).all()
        });
    }
    save(req, res) {
        res.render('admin/settings/index', {
            title: 'Setting'
        });
    }
    edit(req, res) {
        res.render('admin/settings/index', {
            title: 'Setting Edit'
        });
    }
    update(req, res) {
        res.render('admin/settings/index', {
            title: 'Setting Edit'
        });
    }
    delete(req, res) {
        res.render('admin/settings/index', {
            title: 'Setting Delete'
        });
    }
}


const $dbc77d772c5516d3$var$route = (0, $jHxPk$express.Router)();
$dbc77d772c5516d3$var$route.get('/', function(req, res) {
    res.render('admin/index');
});
$dbc77d772c5516d3$var$route.get('/pages', function(req, res) {
    res.render('admin/pages/index');
});
$dbc77d772c5516d3$var$route.get('/posts', function(req, res) {
    res.render('admin/posts/index');
});
$dbc77d772c5516d3$var$route.use('/menu', new (0, $1ab8edb67f977a57$export$2e2bcd8739ae039)());
$dbc77d772c5516d3$var$route.use('/categories', new (0, $9a11bc810c7bf81f$export$2e2bcd8739ae039)());
$dbc77d772c5516d3$var$route.use('/products', new (0, $7a7e09a87be4d863$export$2e2bcd8739ae039)());
$dbc77d772c5516d3$var$route.use('/orders', new (0, $14c4b712a7937ece$export$2e2bcd8739ae039)());
$dbc77d772c5516d3$var$route.use('/users', new (0, $cb2a9f93af049bd0$export$2e2bcd8739ae039)());
$dbc77d772c5516d3$var$route.use('/settings', new (0, $54d14ccb240b63c6$export$2e2bcd8739ae039)());
var $dbc77d772c5516d3$export$2e2bcd8739ae039 = $dbc77d772c5516d3$var$route;


const $a826c173f4456cde$var$app = (0, ($parcel$interopDefault($jHxPk$express)))();
$a826c173f4456cde$var$app.set('view engine', 'pug');
$a826c173f4456cde$var$app.set('views', 'views');
$a826c173f4456cde$var$app.use((0, ($parcel$interopDefault($jHxPk$express))).json());
$a826c173f4456cde$var$app.use((0, ($parcel$interopDefault($jHxPk$express))).urlencoded({
    extended: false
}));
$a826c173f4456cde$var$app.use((0, ($parcel$interopDefault($jHxPk$express))).static('public'));
// Register Path
$a826c173f4456cde$var$app.use('/', new (0, $98f6272647c1a1a1$export$2e2bcd8739ae039)());
$a826c173f4456cde$var$app.use('/admin', (0, $dbc77d772c5516d3$export$2e2bcd8739ae039));
$a826c173f4456cde$var$app.use('/api', (0, $6c1cd3ec0accd830$export$2e2bcd8739ae039));
$a826c173f4456cde$var$app.use('/users', new (0, $4a8609086f4d1328$export$2e2bcd8739ae039)());
// catch 404 and forward to error handler
$a826c173f4456cde$var$app.use(function(req, res, next) {
    next((0, ($parcel$interopDefault($jHxPk$httperrors)))(404));
});
// Error Handler
$a826c173f4456cde$var$app.use((err, req, res, next)=>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var $a826c173f4456cde$export$2e2bcd8739ae039 = $a826c173f4456cde$var$app;


const $df2493fea5b50acf$var$hostname = process.env.HOST || '127.0.0.1';
const $df2493fea5b50acf$var$port = process.env.PORT || 3000;
(0, $a826c173f4456cde$export$2e2bcd8739ae039).listen($df2493fea5b50acf$var$port, $df2493fea5b50acf$var$hostname, function() {
    console.log(`Server is live. You can see http://${$df2493fea5b50acf$var$hostname}:${$df2493fea5b50acf$var$port}`);
});


//# sourceMappingURL=main.js.map
