// GET JSON file in args 
const yargs = require('yargs');
yargs.options({
    port: {
        alias: 'p',
        description: 'Set port',
        default: 3000
    },
    file: {
        alias: 'f',
        description: 'Set JSON File',
        default: './json-samples/default.json'
    },
    authentication: {
        alias: 'a',
        description: 'Enable authenticaded routes',
        default: 'true'
    },
    delay: {
        alias: 'd',
        description: 'Miliseconds delay before response',
        default: '1500'
    }
});

console.log(yargs.argv);

const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const express = require('express')
const app = express();
const port = process.env.PORT || 3000;

// bodyParser, load json-server instance to use in this module
server.use(jsonServer.bodyParser)

// Use json-server middlewares 
// server.use(middlewares);


// start code by Nhan

const fetch = require('node-fetch');


server.use(express.static('views'));

server.set('views', './views');
server.set('view engine', 'ejs');

const url = 'http://localhost:3000/';
const fetchAPi = async(url, option) => {
    const dulieu = await fetch(url, option);
    return dulieu.json();
}


const getAllData = async(subUrl) => {
    var baseUrl = url + subUrl;
    const options = {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }
    return await fetchAPi(baseUrl, options);
}

// end code by nhan


// configure user storage in memory
// const userStorage = require('./security/users-storage')({
//     email: 'user@example.com',
//     password: '1234'
// });
// userStorage.logUsers();

// // Route for login
// const login = require('./routes/login-route')(userStorage);
// server.post('/login', login);

// // Route for sign-in
// const register = require('./routes/sign-in-route')(userStorage);
// server.post('/sign-in', register);

server.get('/movie', async(req, res) => {
    var datas = await getAllData('films');
    var categories = await getAllData('categories');
    var types = await getAllData('types');
    res.render('movies', {
        datas: datas,
        categories: categories,
        types: types
    })
})

server.get('/listmovie', async(req, res) => {
    let datas = await getAllData('films');
    res.json(datas)
})

server.get('/listtype', async(req, res) => {
    let datas = await getAllData('types');
    res.json(datas)
})

server.get('/listcategory', async(req, res) => {
    let datas = await getAllData('categories');
    res.json(datas)
})

server.get('/detail/:id', async(req, res) => {
    var id = req.params.id;
    let datas = await getAllData('films/' + id);
    res.json(datas)
})

server.get('/detail/:id', async(req, res) => {
    var id = req.params.id;
    let datas = await getAllData('films/' + id);
    res.json(datas)
})

// Auth middleware 
// if (yargs.argv.authentication === 'true') {
//     const authMiddleware = require('./middleware/auth-middleware');
//     server.use(authMiddleware);
// }

// delay middleware
// const delayMiddleware = require('./middleware/delay-middleware')(yargs.argv.delay);
// server.use(delayMiddleware);

// Token verify route
// const verify = require('./routes/verify-route');
// const { response } = require('express');
// server.get('/verify', verify);

// Start JSON Server
server.use(router);
server.listen(port);