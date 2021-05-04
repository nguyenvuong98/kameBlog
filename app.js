const express = require('express');
const app = express();
const port = process.env.PORT || 8888;
const kameQuestionPresenter = require('./presenter/kameQuestion.presenter');
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.listen(port, () => {
    console.log(`Server listen on ${port} ...`);
});

app.get('/', async (req, res) => {
    try {
        let query = req.query;
        let process = await kameQuestionPresenter.getData(query);
        return res.status(200).json({status: true, data: process, message: 'success'});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});

app.post('/insert', async (req, res) => {
    try {
        let body = req.body;
        let create = await kameQuestionPresenter.create(body);
        return res.status(200).json({status: true, data: create, message: 'success'});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});

app.post('/like', async (req, res) => {
    try {
        let body = req.body;
        let like = await kameQuestionPresenter.like(body);
        return res.status(200).json({status: true, data: like, message: 'success'});
    } catch (e) {
        return res.status(200).json({status: false, message: e.message});
    }
});