import app from '../app';

const hostname = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 3000;

app.listen(port, hostname, function(){
    console.log(`Server is live. You can see http://${hostname}:${port}`);
});