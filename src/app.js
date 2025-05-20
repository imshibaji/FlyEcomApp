import createError from 'http-errors';
import express from 'express';
// import indexRoutes from './routes/index';
import FrontController from './controllers/FrontController';
import UserController from './controllers/UserController';

const app = express();

app.set('view engine', 'pug');
app.set('views','views');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// Register Path
app.use('/', new FrontController());
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