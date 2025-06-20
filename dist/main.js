var $3PGwM$httperrors = require("http-errors");
var $3PGwM$express = require("express");
var $3PGwM$knex = require("knex");
var $3PGwM$multer = require("multer");
var $3PGwM$path = require("path");
var $3PGwM$fs = require("fs");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}



class $5c59ea4c8355861e$export$2e2bcd8739ae039 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
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
 */ var $8f83deb1b44cdde1$export$2e2bcd8739ae039 = {
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


const $720605a1bc090684$var$db = (0, ($parcel$interopDefault($3PGwM$knex)))((0, $8f83deb1b44cdde1$export$2e2bcd8739ae039).development);
class $720605a1bc090684$export$d12e20a4eec10acf {
    constructor(table, schema = null){
        this.table = table;
        this.schema = schema; // zod schema
    }
    getTable() {
        return this.table;
    }
    async validate(data) {
        if (!this.schema) return data;
        return this.schema.parseAsync(data);
    }
    // HOOKS
    async beforeCreate(data) {}
    async afterCreate(data, result) {}
    async all() {
        return await $720605a1bc090684$var$db(this.table).select('*');
    }
    async find(id) {
        return await $720605a1bc090684$var$db(this.table).select('*').where('id', id).first();
    }
    async create(data) {
        const validData = await this.validate(data);
        await this.beforeCreate(validData);
        const [id] = await $720605a1bc090684$var$db(this.table).insert(validData);
        const result = await this.find(id);
        await this.afterCreate(validData, result);
        return result;
    }
    async update(id, data) {
        const validData = await this.validate(data);
        await this.beforeCreate(validData);
        const result = await $720605a1bc090684$var$db(this.table).where({
            id: id
        }).update(validData);
        console.log(result);
        await this.afterCreate(validData, result);
        return result;
    }
    async delete(id) {
        return await $720605a1bc090684$var$db(this.table).where('id', id).del();
    }
    where(filter) {
        return $720605a1bc090684$var$db(this.table).where(filter);
    }
    // RELATIONSHIP HELPERS
    async hasOne(relatedModel, foreignKey, localKey = 'id') {
        return $720605a1bc090684$var$db(relatedModel.table).where(foreignKey, this[localKey]).first();
    }
    async hasMany(relatedModel, foreignKey, localKey = 'id') {
        return $720605a1bc090684$var$db(relatedModel.table).where(foreignKey, this[localKey]);
    }
    async belongsTo(relatedModel, foreignKey, targetKey = 'id') {
        return $720605a1bc090684$var$db(relatedModel.table).where(targetKey, this[foreignKey]).first();
    }
}
function $720605a1bc090684$export$2e2bcd8739ae039(table) {
    return new $720605a1bc090684$export$d12e20a4eec10acf(table);
}


class $e79cae0f6706b914$export$621c2e9225361608 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('users');
    }
}
const $e79cae0f6706b914$export$54582e7b17f0fab7 = new $e79cae0f6706b914$export$621c2e9225361608();


class $1c16914251e6a9ba$export$2e2bcd8739ae039 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/create', this.create);
        route.post('/', this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', this.update);
        route.post('/delete/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const users = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).all();
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
        const id = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).create(data);
        if (id) return res.redirect('/users');
        res.redirect('/users/create');
    }
    async edit(req, res) {
        const data = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).find(req.params.id);
        // console.log(data);
        res.render('users/edit', {
            title: 'Edit User',
            user: data
        });
    }
    async update(req, res) {
        const data = req.body;
        // const id = await db('users').update(user).where('id', user.id);
        const id = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).update(data.id, data);
        if (id) return res.redirect('/users');
        res.redirect('/users/edit');
    }
    async delete(req, res) {
        // const id = await db('users').where('id', req.params.id).del();
        const id = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).delete(req.params.id);
        if (id) return res.redirect('/users');
        res.redirect('/users');
    }
}







class $d9c71b4f8cb1b933$export$2e2bcd8739ae039 {
    constructor(model, resource, { title: title = 'Resource', viewPrefix: viewPrefix = 'admin', asApi: asApi = false } = {}){
        this.model = model;
        this.resource = resource;
        this.title = title;
        this.viewPrefix = viewPrefix;
        this.asApi = asApi;
        this.streamClients = new Set(); // SSE clients
        // File upload config
        const storage = (0, ($parcel$interopDefault($3PGwM$multer))).diskStorage({
            destination: 'public/uploads/',
            filename: (req, file, cb)=>{
                const ext = (0, ($parcel$interopDefault($3PGwM$path))).extname(file.originalname);
                cb(null, `${Date.now()}${ext}`);
            }
        });
        this.upload = (0, ($parcel$interopDefault($3PGwM$multer)))({
            storage: storage
        });
    }
    get viewPath() {
        return `${this.viewPrefix}/${this.resource}`;
    }
    // Register all standard routes including SSE
    registerRoutes(router, { prefix: prefix = '' } = {}) {
        const base = `${prefix}/${this.resource}`;
        // SSE stream
        router.get(`${base}/stream`, this.stream.bind(this));
        // Standard routes
        router.get(`${base}`, this.list.bind(this));
        router.get(`${base}/create`, this.create.bind(this));
        router.post(`${base}`, this.upload.single('image'), this.save.bind(this));
        router.get(`${base}/:id`, this.show.bind(this));
        router.get(`${base}/:id/edit`, this.edit.bind(this));
        router.put(`${base}/:id/update`, this.upload.single('image'), this.update.bind(this));
        router.delete(`${base}/:id/delete`, this.delete.bind(this));
    }
    // Smart render with JSON fallback
    async render(req, res, view, data1) {
        const isApi = data1.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
        if (isApi) return res.json({
            success: true,
            data: data1
        });
        try {
            res.render(view, data1);
        } catch (err) {
            if (err.message.includes('Failed to lookup view')) res.json({
                success: true,
                viewFallback: true,
                data: data1
            });
            else throw err;
        }
    }
    // File deletion helper
    deleteFileIfExists(filePath) {
        const fullPath = (0, ($parcel$interopDefault($3PGwM$path))).join(process.cwd(), 'public', filePath.replace(/^\/+/, ''));
        (0, ($parcel$interopDefault($3PGwM$fs))).access(fullPath, (0, ($parcel$interopDefault($3PGwM$fs))).constants.F_OK, (err)=>{
            if (!err) (0, ($parcel$interopDefault($3PGwM$fs))).unlink(fullPath, (err)=>{
                if (err) console.error('Error deleting file:', err);
            });
        });
    }
    // Push data to all live SSE clients
    pushStreamData(data1) {
        const payload = `data: ${JSON.stringify(data1)}\n\n`;
        for (const res of this.streamClients)try {
            res.write(payload);
        } catch (err) {
            this.streamClients.delete(res);
        }
    }
    // Live SSE stream endpoint
    async stream(req, res) {
        res.set({
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });
        res.flushHeaders();
        this.streamClients.add(res);
        // Optional: periodic heartbeat
        const interval = setInterval(()=>{
            res.write(`data: ${JSON.stringify({
                ping: new Date().toISOString()
            })}\n\n`);
        }, 15000);
        req.on('close', ()=>{
            clearInterval(interval);
            this.streamClients.delete(res);
            res.end();
        });
    }
    // CRUD methods below
    async list(req, res) {
        const records = await this.model.all();
        await this.render(req, res, `${this.viewPath}/index`, {
            [this.resource]: records,
            title: `${this.title} List`
        });
    }
    async create(req, res) {
        await this.render(req, res, `${this.viewPath}/create`, {
            title: `Create ${this.title}`
        });
    }
    async show(req, res) {
        const record = await this.model.find(req.params.id);
        await this.render(req, res, `${this.viewPath}/show`, {
            [this.resource.slice(0, -1)]: record,
            title: `${this.title} Details`
        });
    }
    async edit(req, res) {
        const record = await this.model.find(req.params.id);
        await this.render(req, res, `${this.viewPath}/edit`, {
            [this.resource.slice(0, -1)]: record,
            title: `Edit ${this.title}`
        });
    }
    async save(req, res) {
        const data1 = req.body;
        if (req.file) data1.image = `/uploads/${req.file.filename}`;
        const result = await this.model.create(data1);
        const savedData = await this.model.find(result.id);
        this.pushStreamData({
            event: 'create',
            data: savedData
        });
        const isApi = data1.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
        if (isApi) return res.json({
            success: true,
            message: `${this.title} created`,
            data: savedData
        });
        res.redirect(`/${this.viewPrefix}/${this.resource}`);
    }
    async update(req, res) {
        const data1 = req.body;
        const existing = await this.model.find(data1.id);
        if (req.file) {
            if (existing?.image) this.deleteFileIfExists(existing.image);
            data1.image = `/uploads/${req.file.filename}`;
        }
        const updated = await this.model.update(data1.id, data1);
        // if (updated.error) return res.json({ success: false, message: updated.error });
        console.log(updated);
        const updatedData = await this.model.find(data1.id);
        this.pushStreamData({
            event: 'update',
            data: updatedData
        });
        const isApi = data1.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
        if (isApi) return res.json({
            success: true,
            message: `${this.title} updated`,
            data: updatedData
        });
        res.redirect(`/${this.viewPrefix}/${this.resource}`);
    }
    async delete(req, res) {
        const existing = await this.model.find(req.params.id);
        if (existing?.image) this.deleteFileIfExists(existing.image);
        await this.model.delete(req.params.id);
        this.pushStreamData({
            event: 'delete',
            id: req.params.id
        });
        const isApi = data.asApi === true || req.query.asApi === 'true' || req.headers.accept?.includes('application/json') || this.asApi;
        if (isApi) return res.json({
            success: true,
            message: `${this.title} deleted`
        });
        res.redirect(`/${this.viewPrefix}/${this.resource}`);
    }
}


class $0ffe09501c96f62c$export$8bd653a33461d337 extends (0, $d9c71b4f8cb1b933$export$2e2bcd8739ae039) {
    constructor(){
        super((0, $e79cae0f6706b914$export$54582e7b17f0fab7), 'users', {
            title: 'User',
            // viewPrefix: 'api',
            asApi: true
        });
    }
}




class $2d56d05ac455fcf5$export$ea9341ce97e15b96 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('carts');
    }
}
const $2d56d05ac455fcf5$export$daf4f2b0193021e2 = new $2d56d05ac455fcf5$export$ea9341ce97e15b96();


class $e5328f9c26fc730a$export$41bd0aa259b8bd99 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const carts = await (0, $2d56d05ac455fcf5$export$daf4f2b0193021e2).all();
        res.json(carts);
    }
    async single(req, res) {
        const cart = await (0, $2d56d05ac455fcf5$export$daf4f2b0193021e2).find(req.params.id);
        res.json(cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $2d56d05ac455fcf5$export$daf4f2b0193021e2).create(data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $2d56d05ac455fcf5$export$daf4f2b0193021e2).update(data.id, data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $2d56d05ac455fcf5$export$daf4f2b0193021e2).delete(req.params.id);
        if (id) return res.redirect('/carts');
        res.redirect('/carts');
    }
}




class $c3cc1681a3def845$export$e1bbb50836aa0481 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('categories');
    }
}
const $c3cc1681a3def845$export$a2705413a9011472 = new $c3cc1681a3def845$export$e1bbb50836aa0481();


class $60cf312414915001$export$b19455c5574c398e {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const carts = await (0, $c3cc1681a3def845$export$a2705413a9011472).all();
        res.json(carts);
    }
    async single(req, res) {
        const cart = await (0, $c3cc1681a3def845$export$a2705413a9011472).find(req.params.id);
        res.json(cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $c3cc1681a3def845$export$a2705413a9011472).create(data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $c3cc1681a3def845$export$a2705413a9011472).update(data.id, data);
        if (id) return res.redirect('/carts');
        res.redirect('/carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $c3cc1681a3def845$export$a2705413a9011472).delete(req.params.id);
        if (id) return res.redirect('/carts');
        res.redirect('/carts');
    }
}




class $12e34c29dad7faac$export$99b67d04e1b65c9c extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('menus');
    }
}
const $12e34c29dad7faac$export$cc7cffe9e4be3b90 = new $12e34c29dad7faac$export$99b67d04e1b65c9c();


class $e504edb39c56c718$export$c0716dcad1882e32 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const menus = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).all();
        res.json(menus);
    }
    async single(req, res) {
        const menu = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).all();
        res.json(menu);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).create(data);
        if (id) return res.redirect('/menus');
        res.redirect('/menus/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).update(data.id, data);
        if (id) return res.redirect('/menus');
        res.redirect('/menus/edit');
    }
    async delete(req, res) {
        const id = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).delete(req.params.id);
        if (id) return res.redirect('/menus');
        res.redirect('/menus');
    }
}




class $ddfcbe5356107152$export$d07d823ae64ba5bf extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('orders');
    }
}
const $ddfcbe5356107152$export$bbc4da2410d90f08 = new $ddfcbe5356107152$export$d07d823ae64ba5bf();


class $8a56a44f19442c88$export$36c71b95759fd255 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const orders = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).all();
        res.json(orders);
    }
    async single(req, res) {
        const order = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).find(req.params.id);
        res.json(order);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).create(data);
        if (id) return res.redirect('/orders');
        res.redirect('/orders/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).update(data.id, data);
        if (id) return res.redirect('/orders');
        res.redirect('/orders/edit');
    }
    async delete(req, res) {
        const id = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).delete(req.params.id);
        if (id) return res.redirect('/orders');
        res.redirect('/orders');
    }
}




class $511d4c80db202b64$export$171c96e3ae1a825d extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('permissions');
    }
}
const $511d4c80db202b64$export$31274c72f0ded6f7 = new $511d4c80db202b64$export$171c96e3ae1a825d();


class $e590532c03367ed3$export$f14414e4da36344a {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const data = await (0, $511d4c80db202b64$export$31274c72f0ded6f7).all();
        return res.json(data);
    }
    async single(req, res) {
        const data = await (0, $511d4c80db202b64$export$31274c72f0ded6f7).single(req.params.id);
        return res.json(data);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $511d4c80db202b64$export$31274c72f0ded6f7).create(data);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $511d4c80db202b64$export$31274c72f0ded6f7).update(data.id, data);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions/edit');
    }
    async delete(req, res) {
        const id = await (0, $511d4c80db202b64$export$31274c72f0ded6f7).delete(req.params.id);
        if (id) return res.redirect('/permissions');
        res.redirect('/permissions');
    }
}




class $b72ce89b77f98a90$export$c043f710884189ad extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('posts');
    }
}
const $b72ce89b77f98a90$export$96ff8f02380ce42b = new $b72ce89b77f98a90$export$c043f710884189ad();


class $502dd910a7620e20$export$c4018ffee86f7dfc {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const posts = await (0, $b72ce89b77f98a90$export$96ff8f02380ce42b).all();
        res.json(posts);
    }
    async single(req, res) {
        const post = await (0, $b72ce89b77f98a90$export$96ff8f02380ce42b).find(req.params.id);
        res.json(post);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $b72ce89b77f98a90$export$96ff8f02380ce42b).create(data);
        if (id) return res.redirect('/posts');
        res.redirect('/posts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $b72ce89b77f98a90$export$96ff8f02380ce42b).update(data.id, data);
        if (id) return res.redirect('/posts');
        res.redirect('/posts/edit');
    }
    async delete(req, res) {
        const id = await (0, $b72ce89b77f98a90$export$96ff8f02380ce42b).delete(req.params.id);
        if (id) return res.redirect('/posts');
        res.redirect('/posts');
    }
}



class $ae7c6e3668f66242$export$f59d3de288812f26 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('products');
    }
}
const $ae7c6e3668f66242$export$e7624ed1afe99528 = new $ae7c6e3668f66242$export$f59d3de288812f26();





const $87d35aed0881b942$var$upload = (0, ($parcel$interopDefault($3PGwM$multer)))({
    dest: 'public/uploads/'
});
class $87d35aed0881b942$export$bd0bf19f25da8474 {
    constructor(modelObject, fileName = 'image'){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', (req, res, next)=>{
            this.model = modelObject;
            this.list(req, res, next);
        });
        route.get('/:id', (req, res, next)=>{
            this.model = modelObject;
            this.single(req, res, next);
        });
        route.post('/', $87d35aed0881b942$var$upload.single(fileName), (req, res, next)=>{
            this.model = modelObject;
            this.save(req, res, next);
        });
        route.put('/update/:id', $87d35aed0881b942$var$upload.single(fileName), (req, res, next)=>{
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
        if (savedData) {
            const data = await this.model.find(savedData[0]);
            return res.json({
                success: true,
                data: data
            });
        }
        res.json({
            success: false,
            error: 'Error: Data not inserted.'
        });
    }
    async update(req, res) {
        const data = req.body;
        const img = req.file;
        if (img) {
            const oneData = await this.model.find(req.body.id);
            if (oneData.image && (0, ($parcel$interopDefault($3PGwM$fs))).existsSync('public/uploads/' + oneData.image)) (0, ($parcel$interopDefault($3PGwM$fs))).unlinkSync('public/uploads/' + oneData.image);
            data.image = img.filename;
        }
        const updatedData = await this.model.update(data.id, data);
        if (updatedData) {
            const data = await this.model.find(updatedData);
            return res.json({
                success: true,
                data: data
            });
        }
        res.json({
            success: false,
            error: 'Error: data not updated.'
        });
    }
    async delete(req, res) {
        const deletedData = await this.model.delete(req.params.id);
        if (deletedData.image && (0, ($parcel$interopDefault($3PGwM$fs))).existsSync('public/uploads/' + deletedData.image)) (0, ($parcel$interopDefault($3PGwM$fs))).unlinkSync('public/uploads/' + deletedData.image);
        if (deletedData) return res.json({
            success: true,
            data: deletedData
        });
        res.json({
            success: false,
            error: 'Error'
        });
    }
}


class $59de550bd570d5b9$export$3b5bd9381a52554c extends (0, $87d35aed0881b942$export$bd0bf19f25da8474) {
}


class $94f9eec94a39dbcb$export$676eee9a3c69e247 extends (0, $59de550bd570d5b9$export$3b5bd9381a52554c) {
    constructor(){
        return super((0, $ae7c6e3668f66242$export$e7624ed1afe99528));
    }
}




class $9c0805fced9c045d$export$9b1c1b0ac848bd2a extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('reviews');
    }
}
const $9c0805fced9c045d$export$4a60180ddabce40 = new $9c0805fced9c045d$export$9b1c1b0ac848bd2a();


class $1fa3117e28a20169$export$aab409ec1c4f7d58 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const reviews = await (0, $9c0805fced9c045d$export$4a60180ddabce40).all();
        res.json(reviews);
    }
    async single(req, res) {
        const review = await (0, $9c0805fced9c045d$export$4a60180ddabce40).find(req.params.id);
        res.json(review);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $9c0805fced9c045d$export$4a60180ddabce40).create(data);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $9c0805fced9c045d$export$4a60180ddabce40).update(data.id, data);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews/edit');
    }
    async delete(req, res) {
        const id = await (0, $9c0805fced9c045d$export$4a60180ddabce40).delete(req.params.id);
        if (id) return res.redirect('/reviews');
        res.redirect('/reviews');
    }
}




class $696bf945a17deb2e$export$2eb7ddb3bece450d extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_carts');
    }
}
const $696bf945a17deb2e$export$b777f5716fd5b8aa = new $696bf945a17deb2e$export$2eb7ddb3bece450d();


class $fe640b52042c74d7$export$85b16370280b2cde {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_carts = await (0, $696bf945a17deb2e$export$b777f5716fd5b8aa).all();
        res.json(user_carts);
    }
    async single(req, res) {
        const user_cart = await (0, $696bf945a17deb2e$export$b777f5716fd5b8aa).find(req.params.id);
        res.json(user_cart);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $696bf945a17deb2e$export$b777f5716fd5b8aa).create(data);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $696bf945a17deb2e$export$b777f5716fd5b8aa).update(data.id, data);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts/edit');
    }
    async delete(req, res) {
        const id = await (0, $696bf945a17deb2e$export$b777f5716fd5b8aa).delete(req.params.id);
        if (id) return res.redirect('/user_carts');
        res.redirect('/user_carts');
    }
}




class $ca22766d6553a6c6$export$b3c0c1ee34ee93f7 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('roles');
    }
}
const $ca22766d6553a6c6$export$cc0c03fe32419b66 = new $ca22766d6553a6c6$export$b3c0c1ee34ee93f7();


class $4e9843b219380647$export$bbaba1d428ab2e6e {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const roles = await (0, $ca22766d6553a6c6$export$cc0c03fe32419b66).all();
        res.json(roles);
    }
    async single(req, res) {
        const role = await (0, $ca22766d6553a6c6$export$cc0c03fe32419b66).find(req.params.id);
        res.json(role);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $ca22766d6553a6c6$export$cc0c03fe32419b66).create(data);
        if (id) return res.redirect('/roles');
        res.redirect('/roles/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $ca22766d6553a6c6$export$cc0c03fe32419b66).update(data.id, data);
        if (id) return res.redirect('/roles');
        res.redirect('/roles/edit');
    }
    async delete(req, res) {
        const id = await (0, $ca22766d6553a6c6$export$cc0c03fe32419b66).delete(req.params.id);
        if (id) return res.redirect('/roles');
        res.redirect('/roles');
    }
}




class $ffc8de37daf0e3ba$export$11cff731c6a94280 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('settings');
    }
}
const $ffc8de37daf0e3ba$export$c02d22b8d9fe1446 = new $ffc8de37daf0e3ba$export$11cff731c6a94280();


class $850de351a0a6f25c$export$fd6acc083edcdaf2 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const settings = await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).all();
        res.json(settings);
    }
    async single(req, res) {
        const setting = await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).find(req.params.id);
        res.json(setting);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).create(data);
        if (id) return res.redirect('/settings');
        res.redirect('/settings/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).update(data.id, data);
        if (id) return res.redirect('/settings');
        res.redirect('/settings/edit');
    }
    async delete(req, res) {
        const id = await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).delete(req.params.id);
        if (id) return res.redirect('/settings');
        res.redirect('/settings');
    }
}




class $f84d332d7e77676a$export$7989d652f1503155 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_addresses');
    }
}
const $f84d332d7e77676a$export$56ff68ac21e4c288 = new $f84d332d7e77676a$export$7989d652f1503155();


class $c260f1fb5b216be2$export$75bc3e97203775ec {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_addresses = await (0, $f84d332d7e77676a$export$56ff68ac21e4c288).all();
        res.json(user_addresses);
    }
    async single(req, res) {
        const user_address = await (0, $f84d332d7e77676a$export$56ff68ac21e4c288).find(req.params.id);
        res.json(user_address);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $f84d332d7e77676a$export$56ff68ac21e4c288).create(data);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $f84d332d7e77676a$export$56ff68ac21e4c288).update(data.id, data);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses/edit');
    }
    async delete(req, res) {
        const id = await (0, $f84d332d7e77676a$export$56ff68ac21e4c288).delete(req.params.id);
        if (id) return res.redirect('/user_addresses');
        res.redirect('/user_addresses');
    }
}




class $7e60c4b508b0431a$export$cd2a2086bdf7df44 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_orders');
    }
}
const $7e60c4b508b0431a$export$960506f80a268063 = new $7e60c4b508b0431a$export$cd2a2086bdf7df44();


class $9ad52cf9d962b978$export$7ca75f83100ec00f {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_orders = await (0, $7e60c4b508b0431a$export$960506f80a268063).all();
        res.json(user_orders);
    }
    async single(req, res) {
        const user_order = await (0, $7e60c4b508b0431a$export$960506f80a268063).find(req.params.id);
        res.json(user_order);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $7e60c4b508b0431a$export$960506f80a268063).create(data);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $7e60c4b508b0431a$export$960506f80a268063).update(data.id, data);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders/edit');
    }
    async delete(req, res) {
        const id = await (0, $7e60c4b508b0431a$export$960506f80a268063).delete(req.params.id);
        if (id) return res.redirect('/user_orders');
        res.redirect('/user_orders');
    }
}




class $c4e0266cf725159f$export$8444034b029dced4 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_payments');
    }
}
const $c4e0266cf725159f$export$76caacbd651f024f = new $c4e0266cf725159f$export$8444034b029dced4();


class $d8c6cfd1048fc55d$export$a57c4a96ea0b64b9 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_payments = await (0, $c4e0266cf725159f$export$76caacbd651f024f).all();
        res.json(user_payments);
    }
    async single(req, res) {
        const user_payment = await (0, $c4e0266cf725159f$export$76caacbd651f024f).find(req.params.id);
        res.json(user_payment);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $c4e0266cf725159f$export$76caacbd651f024f).create(data);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $c4e0266cf725159f$export$76caacbd651f024f).update(data.id, data);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments/edit');
    }
    async delete(req, res) {
        const id = await (0, $c4e0266cf725159f$export$76caacbd651f024f).delete(req.params.id);
        if (id) return res.redirect('/user_payments');
        res.redirect('/user_payments');
    }
}




class $d3c3a27af4ebcfad$export$ea55741716e07e69 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_reviews');
    }
}
const $d3c3a27af4ebcfad$export$13d41071d3344275 = new $d3c3a27af4ebcfad$export$ea55741716e07e69();


class $47cce5d536fbcd1a$export$d3cb0d30dc2175d {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_reviews = await (0, $d3c3a27af4ebcfad$export$13d41071d3344275).all();
        res.json(user_reviews);
    }
    async single(req, res) {
        const user_reviews = await (0, $d3c3a27af4ebcfad$export$13d41071d3344275).find(req.params.id);
        res.json(user_reviews);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $d3c3a27af4ebcfad$export$13d41071d3344275).create(data);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $d3c3a27af4ebcfad$export$13d41071d3344275).update(data.id, data);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews/edit');
    }
    async delete(req, res) {
        const id = await (0, $d3c3a27af4ebcfad$export$13d41071d3344275).delete(req.params.id);
        if (id) return res.redirect('/user_reviews');
        res.redirect('/user_reviews');
    }
}




class $e2705ed2cb4c7c69$export$7466c2af0c0ecfc4 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_roles');
    }
}
const $e2705ed2cb4c7c69$export$1d2f884bd9889e1 = new $e2705ed2cb4c7c69$export$7466c2af0c0ecfc4();


class $b9be409835c328e6$export$55c658694035bdef {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const userRoles = await (0, $e2705ed2cb4c7c69$export$1d2f884bd9889e1).all();
        res.json(userRoles);
    }
    async single(req, res) {
        const userRole = await (0, $e2705ed2cb4c7c69$export$1d2f884bd9889e1).find(req.params.id);
        res.json(userRole);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $e2705ed2cb4c7c69$export$1d2f884bd9889e1).create(data);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $e2705ed2cb4c7c69$export$1d2f884bd9889e1).update(data.id, data);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles/edit');
    }
    async delete(req, res) {
        const id = await (0, $e2705ed2cb4c7c69$export$1d2f884bd9889e1).delete(req.params.id);
        if (id) return res.redirect('/userRoles');
        res.redirect('/userRoles');
    }
}




class $70c9e251e7d9b2ae$export$bd9fc755e1e606b6 extends (0, $720605a1bc090684$export$d12e20a4eec10acf) {
    constructor(){
        super('user_wishlists');
    }
}
const $70c9e251e7d9b2ae$export$26ccf2496e669201 = new $70c9e251e7d9b2ae$export$bd9fc755e1e606b6();


class $b96e9e74c65bdcb9$export$f197b856d17b2798 {
    constructor(){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/:id', this.single);
        route.post('/', this.save);
        route.put('/update/:id', this.update);
        route.delete('/:id', this.delete);
        return route;
    }
    async list(req, res) {
        const user_wishlists = await (0, $70c9e251e7d9b2ae$export$26ccf2496e669201).all();
        res.json(user_wishlists);
    }
    async single(req, res) {
        const user_wishlist = await (0, $70c9e251e7d9b2ae$export$26ccf2496e669201).find(req.params.id);
        res.json(user_wishlist);
    }
    async save(req, res) {
        const data = req.body;
        const id = await (0, $70c9e251e7d9b2ae$export$26ccf2496e669201).create(data);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists/create');
    }
    async update(req, res) {
        const data = req.body;
        const id = await (0, $70c9e251e7d9b2ae$export$26ccf2496e669201).update(data.id, data);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists/edit');
    }
    async delete(req, res) {
        const id = await (0, $70c9e251e7d9b2ae$export$26ccf2496e669201).delete(req.params.id);
        if (id) return res.redirect('/user_wishlists');
        res.redirect('/user_wishlists');
    }
}


const $be9e254f217a7a93$var$route = (0, $3PGwM$express.Router)();
const $be9e254f217a7a93$var$userController = new (0, $0ffe09501c96f62c$export$8bd653a33461d337)();
$be9e254f217a7a93$var$userController.registerRoutes($be9e254f217a7a93$var$route, {
    prefix: ''
});
// route.use('/users', new UserController());
$be9e254f217a7a93$var$route.use('/carts', new (0, $e5328f9c26fc730a$export$41bd0aa259b8bd99)());
$be9e254f217a7a93$var$route.use('/categories', new (0, $60cf312414915001$export$b19455c5574c398e)());
$be9e254f217a7a93$var$route.use('/menus', new (0, $e504edb39c56c718$export$c0716dcad1882e32)());
$be9e254f217a7a93$var$route.use('/orders', new (0, $8a56a44f19442c88$export$36c71b95759fd255)());
$be9e254f217a7a93$var$route.use('/permissions', new (0, $e590532c03367ed3$export$f14414e4da36344a)());
$be9e254f217a7a93$var$route.use('/posts', new (0, $502dd910a7620e20$export$c4018ffee86f7dfc)());
$be9e254f217a7a93$var$route.use('/products', new (0, $94f9eec94a39dbcb$export$676eee9a3c69e247)());
$be9e254f217a7a93$var$route.use('/reviews', new (0, $1fa3117e28a20169$export$aab409ec1c4f7d58)());
$be9e254f217a7a93$var$route.use('/roles', new (0, $4e9843b219380647$export$bbaba1d428ab2e6e)());
$be9e254f217a7a93$var$route.use('/settings', new (0, $850de351a0a6f25c$export$fd6acc083edcdaf2)());
$be9e254f217a7a93$var$route.use('/user_addresses', new (0, $c260f1fb5b216be2$export$75bc3e97203775ec)());
$be9e254f217a7a93$var$route.use('/user_carts', new (0, $fe640b52042c74d7$export$85b16370280b2cde)());
$be9e254f217a7a93$var$route.use('/user_orders', new (0, $9ad52cf9d962b978$export$7ca75f83100ec00f)());
$be9e254f217a7a93$var$route.use('/user_payments', new (0, $d8c6cfd1048fc55d$export$a57c4a96ea0b64b9)());
$be9e254f217a7a93$var$route.use('/user_reviews', new (0, $47cce5d536fbcd1a$export$d3cb0d30dc2175d)());
$be9e254f217a7a93$var$route.use('/user_Roles', new (0, $b9be409835c328e6$export$55c658694035bdef)());
$be9e254f217a7a93$var$route.use('/user_wishlists', new (0, $b96e9e74c65bdcb9$export$f197b856d17b2798)());
var $be9e254f217a7a93$export$2e2bcd8739ae039 = $be9e254f217a7a93$var$route;







const $0a13916f247d137d$var$upload = (0, ($parcel$interopDefault($3PGwM$multer)))({
    dest: 'public/uploads/'
});
class $0a13916f247d137d$export$3b5bd9381a52554c {
    constructor(fileName = 'image'){
        const route = (0, $3PGwM$express.Router)();
        route.get('/', this.list);
        route.get('/show/:id', this.show);
        route.get('/create', this.create);
        route.post('/', $0a13916f247d137d$var$upload.single(fileName), this.save);
        route.get('/edit/:id', this.edit);
        route.post('/update', $0a13916f247d137d$var$upload.single(fileName), this.update);
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


class $8a3073f4302cde34$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
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
        const users = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).all();
        res.render('admin/users/index', {
            users: users,
            title: 'Users Section'
        });
    }
    async show(req, res) {
        const user = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).find(req.params.id);
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
        await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).create(user);
        res.redirect('/admin/users');
    }
    async edit(req, res) {
        const user = await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).find(req.params.id);
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
        await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).update(user.id, user);
        res.redirect('/admin/users');
    }
    async delete(req, res) {
        await (0, $e79cae0f6706b914$export$54582e7b17f0fab7).delete(req.params.id);
        res.redirect('/admin/users');
    }
}




class $2daee833097940d0$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
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
        const orders = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).all();
        res.render('admin/orders/index', {
            orders: orders,
            title: 'Orders Section'
        });
    }
    async show(req, res) {
        const order = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).find(req.params.id);
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
        await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).create(order);
        res.redirect('/admin/orders');
    }
    async edit(req, res) {
        const order = await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).find(req.params.id);
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
        await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).update(order.id, order);
        res.redirect('/admin/orders');
    }
    async delete(req, res) {
        await (0, $ddfcbe5356107152$export$bbc4da2410d90f08).delete(req.params.id);
        res.redirect('/admin/orders');
    }
}





class $dbcf8bf34f1387b5$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
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
        const products = await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).all();
        res.render('admin/products/index', {
            products: products,
            title: 'Products Section'
        });
    }
    async show(req, res) {
        const product = await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).find(req.params.id);
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
        await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).create(product);
        res.redirect('/admin/products');
    }
    async edit(req, res) {
        const product = await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).find(req.params.id);
        res.render('admin/products/edit', {
            product: product,
            title: 'Edit Product'
        });
    }
    async update(req, res) {
        const product = req.body;
        const img = req.file;
        if (img) {
            const productData = await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).find(req.body.id);
            if (productData.image && (0, ($parcel$interopDefault($3PGwM$fs))).existsSync('public/uploads/' + productData.image)) (0, ($parcel$interopDefault($3PGwM$fs))).unlinkSync('public/uploads/' + productData.image);
            product.image = img.filename;
        }
        await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).update(product.id, product);
        res.redirect('/admin/products');
    }
    async delete(req, res) {
        const productData = await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).find(req.params.id);
        if (productData.image && (0, ($parcel$interopDefault($3PGwM$fs))).existsSync('public/uploads/' + productData.image)) (0, ($parcel$interopDefault($3PGwM$fs))).unlinkSync('public/uploads/' + productData.image);
        await (0, $ae7c6e3668f66242$export$e7624ed1afe99528).delete(req.params.id);
        res.redirect('/admin/products');
    }
}




class $25551fd63e04c47d$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
    async list(req, res) {
        const categories = await (0, $c3cc1681a3def845$export$a2705413a9011472).all();
        res.render('admin/categories/index', {
            categories: categories,
            title: 'Categories Section'
        });
    }
    async show(req, res) {
        const category = await (0, $c3cc1681a3def845$export$a2705413a9011472).find(req.params.id);
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
        await (0, $c3cc1681a3def845$export$a2705413a9011472).create(product);
        res.redirect('/admin/categories');
    }
    async edit(req, res) {
        const category = await (0, $c3cc1681a3def845$export$a2705413a9011472).find(req.params.id);
        res.render('admin/categories/edit', {
            category: category,
            title: 'Edit Category'
        });
    }
    async update(req, res) {
        const category = req.body;
        await (0, $c3cc1681a3def845$export$a2705413a9011472).update(category.id, category);
        res.redirect('/admin/categories');
    }
    async delete(req, res) {
        await (0, $c3cc1681a3def845$export$a2705413a9011472).delete(req.params.id);
        res.redirect('/admin/categories');
    }
}




class $db715ed7f7b3e677$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
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
        const menus = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).all();
        res.render('admin/menus/index', {
            menus: menus,
            title: 'Menus Section'
        });
    }
    async show(req, res) {
        const menu = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).find(req.params.id);
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
        await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).create(menu);
        res.redirect('/admin/menus');
    }
    async edit(req, res) {
        const menu = await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).find(req.params.id);
        res.render('admin/menus/edit', {
            menu: menu,
            title: 'Edit Menu'
        });
    }
    async update(req, res) {
        const menu = req.body;
        await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).update(menu.id, menu);
        res.redirect('/admin/menus');
    }
    async delete(req, res) {
        await (0, $12e34c29dad7faac$export$cc7cffe9e4be3b90).delete(req.params.id);
        res.redirect('/admin/menus');
    }
}




class $ef023f9b523d0dc7$export$2e2bcd8739ae039 extends (0, $0a13916f247d137d$export$3b5bd9381a52554c) {
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
            settings: await (0, $ffc8de37daf0e3ba$export$c02d22b8d9fe1446).all()
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


const $4a244960c6409d39$var$route = (0, $3PGwM$express.Router)();
$4a244960c6409d39$var$route.get('/', function(req, res) {
    res.render('admin/index');
});
$4a244960c6409d39$var$route.get('/pages', function(req, res) {
    res.render('admin/pages/index');
});
$4a244960c6409d39$var$route.get('/posts', function(req, res) {
    res.render('admin/posts/index');
});
$4a244960c6409d39$var$route.use('/menu', new (0, $db715ed7f7b3e677$export$2e2bcd8739ae039)());
$4a244960c6409d39$var$route.use('/categories', new (0, $25551fd63e04c47d$export$2e2bcd8739ae039)());
$4a244960c6409d39$var$route.use('/products', new (0, $dbcf8bf34f1387b5$export$2e2bcd8739ae039)());
$4a244960c6409d39$var$route.use('/orders', new (0, $2daee833097940d0$export$2e2bcd8739ae039)());
$4a244960c6409d39$var$route.use('/users', new (0, $8a3073f4302cde34$export$2e2bcd8739ae039)());
$4a244960c6409d39$var$route.use('/settings', new (0, $ef023f9b523d0dc7$export$2e2bcd8739ae039)());
var $4a244960c6409d39$export$2e2bcd8739ae039 = $4a244960c6409d39$var$route;


const $298ad17b2ba72143$var$app = (0, ($parcel$interopDefault($3PGwM$express)))();
$298ad17b2ba72143$var$app.set('view engine', 'pug');
$298ad17b2ba72143$var$app.set('views', 'views');
$298ad17b2ba72143$var$app.use((0, ($parcel$interopDefault($3PGwM$express))).json());
$298ad17b2ba72143$var$app.use((0, ($parcel$interopDefault($3PGwM$express))).urlencoded({
    extended: false
}));
$298ad17b2ba72143$var$app.use((0, ($parcel$interopDefault($3PGwM$express))).static('public'));
// Register Path
$298ad17b2ba72143$var$app.use('/', new (0, $5c59ea4c8355861e$export$2e2bcd8739ae039)());
$298ad17b2ba72143$var$app.use('/admin', (0, $4a244960c6409d39$export$2e2bcd8739ae039));
$298ad17b2ba72143$var$app.use('/api', (0, $be9e254f217a7a93$export$2e2bcd8739ae039));
$298ad17b2ba72143$var$app.use('/users', new (0, $1c16914251e6a9ba$export$2e2bcd8739ae039)());
// catch 404 and forward to error handler
$298ad17b2ba72143$var$app.use(function(req, res, next) {
    next((0, ($parcel$interopDefault($3PGwM$httperrors)))(404));
});
// Error Handler
$298ad17b2ba72143$var$app.use((err, req, res, next)=>{
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var $298ad17b2ba72143$export$2e2bcd8739ae039 = $298ad17b2ba72143$var$app;


const $655b1d00c936624d$var$hostname = process.env.HOST || '127.0.0.1';
const $655b1d00c936624d$var$port = process.env.PORT || 3000;
(0, $298ad17b2ba72143$export$2e2bcd8739ae039).listen($655b1d00c936624d$var$port, $655b1d00c936624d$var$hostname, function() {
    console.log(`Server is live. You can see http://${$655b1d00c936624d$var$hostname}:${$655b1d00c936624d$var$port}`);
});


