require("dotenv").config()
console.log(process.env.DB_NAME)
const socket = require('./socket')
const express = require('express')
const handlebars = require('express-handlebars')
const multer = require('multer')
const users = require('./users')
const articles = require('./articles')
const ServerClient = require('./ServerClient')
const ViewClient = require('./ViewClient')
const pushToken = require('./push_token')


const PORT = 8315;
const app = express();
const upload = multer({
    dest: 'uploads/',
});


app.engine('.hbs', handlebars({
    defaultLayout: 'main',
    extname: '.hbs'
}))
app.set('view engine', '.hbs');
app.use(express.static("static"));



const api = express.Router();


api.post("/register", upload.none(), (req, res) => {
    users.register_user(new ServerClient(res), req.body);
})

api.post("/login", upload.none(), (req, res) => {
    users.login_user(new ServerClient(res), req.body);
})

api.post("/article/add", upload.array("images[]"), (req, res) => {
    let data = Object.assign({
        files: req.files,
    }, req.body);
    console.log(req.files)
    articles.add_article(new ServerClient(res), data);
})

api.post("/article/get", upload.none(), (req, res) => {
    articles.get_article(new ServerClient(res), req.body);
})

api.post("/article/many", upload.none(), (req, res) => {
    articles.many_articles(new ServerClient(res), req.body);
})

api.post("/article/my", upload.none(), (req, res) => {
    articles.my_articles(new ServerClient(res), req.body);
})

api.post("/article/delete", upload.none(), (req, res) => {
    articles.delete_article(new ServerClient(res), req.body);
})


api.post("/push-token/register", upload.none(), (req, res) => {
    console.log(req.body);
    pushToken.register_push(new ServerClient(res), req.body);
})

api.post("/push-token/test", upload.none(), (req, res) => {
    pushToken.test_push(new ServerClient(res), req.body);
})


app.get("/", (req, res) => {
    res.render("home");
})

app.get("/login", (req, res) => {
    res.render("login");
})

app.get("/register", (req, res) => {
    res.render("register");
})

app.get("/article/add", (req, res) => {
    res.render("article_add");
})

app.get("/article/:id", (req, res) => {
    articles.get_article(new ViewClient(res, "article_get"), {id: req.params.id});
})


app.use('/api', api); //require('./api')
app.listen(PORT, () => console.log(`Backend on port ${PORT}`));



