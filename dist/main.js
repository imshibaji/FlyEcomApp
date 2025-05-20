var $3PGwM$httperrors = require("http-errors");
var $3PGwM$express = require("express");
var $3PGwM$knex = require("knex");


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




const $5f8b535a066df716$var$knex = $3PGwM$knex({
    client: 'mysql2',
    connection: {
        host: '127.0.0.1',
        port: 3306,
        user: 'root',
        password: 'password',
        database: 'soumya'
    },
    debug: false
});
var $5f8b535a066df716$export$2e2bcd8739ae039 = $5f8b535a066df716$var$knex;



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


const $41154ef25a598a08$var$db = (0, ($parcel$interopDefault($3PGwM$knex)))((0, $8f83deb1b44cdde1$export$2e2bcd8739ae039).development);
class $41154ef25a598a08$export$ef88aa0d34c34520 {
    constructor(table){
        this.table = table;
    }
    getTable() {
        return this.table;
    }
    async all() {
        return await $41154ef25a598a08$var$db(this.table).select('*');
    }
    async find(id) {
        return await $41154ef25a598a08$var$db(this.table).select('*').where('id', id).first();
    }
    async create(data) {
        return await $41154ef25a598a08$var$db(this.table).insert(data);
    }
    async update(id, data) {
        // remove id
        if (data.id) delete data.id;
        return await $41154ef25a598a08$var$db(this.table).update(data).where('id', id);
    }
    async delete(id) {
        return await $41154ef25a598a08$var$db(this.table).where('id', id).del();
    }
}


class $e79cae0f6706b914$export$1f44aaf2ec115b54 extends (0, $41154ef25a598a08$export$ef88aa0d34c34520) {
    constructor(){
        super('users');
    }
}
const $e79cae0f6706b914$export$ddb906a32562356c = new $e79cae0f6706b914$export$1f44aaf2ec115b54();


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
        const users = await (0, $e79cae0f6706b914$export$ddb906a32562356c).all();
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
        const id = await (0, $e79cae0f6706b914$export$ddb906a32562356c).create(data);
        if (id) return res.redirect('/users');
        res.redirect('/users/create');
    }
    async edit(req, res) {
        const data = await (0, $e79cae0f6706b914$export$ddb906a32562356c).find(req.params.id);
        // console.log(data);
        res.render('users/edit', {
            title: 'Edit User',
            user: data
        });
    }
    async update(req, res) {
        const data = req.body;
        // const id = await db('users').update(user).where('id', user.id);
        const id = await (0, $e79cae0f6706b914$export$ddb906a32562356c).update(data.id, data);
        if (id) return res.redirect('/users');
        res.redirect('/users/edit');
    }
    async delete(req, res) {
        // const id = await db('users').where('id', req.params.id).del();
        const id = await (0, $e79cae0f6706b914$export$ddb906a32562356c).delete(req.params.id);
        if (id) return res.redirect('/users');
        res.redirect('/users');
    }
}


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


