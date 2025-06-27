import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import cookieSession from 'cookie-session';
import methodOverride from 'method-override';
// import indexRoutes from './routes/index';
import FrontController from './controllers/FrontController';
import UserController from './controllers/UserController';
import api from './routes/api';
import admin from './routes/admin';

const app = express();

app.set('view engine', 'pug');
app.set('views','views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Session Setup
app.use(cookieParser());
app.set('trust proxy', 1); // trust first proxy
app.use(cookieSession({
    name: 'session',
    keys: ['Set cookie key'],
    overwrite: true,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user;
    res.locals.flash = req.session.flash || null;
    delete req.session.flash;
    next();
});

app.use(methodOverride('_method'));

// Register Path
app.use('/', new FrontController());
app.use('/admin', admin);
app.use('/api', api);
app.use('/users', new UserController());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// Error Handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default app;