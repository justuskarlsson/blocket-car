const db = require('../db')
const fs = require('fs')
const {promisify} = require('util')
const path = require('path')
const send_push = require('../push_token/send_push_all')

const PATH = process.cwd();
const get_url = (name) => path.resolve(PATH, name);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const unlink = promisify(fs.unlink);

module.exports = async (client, data) => {
    data = Object.assign({
        userId: 3,
        description: "Hello",
        price: 150,
    }, data)
    if (data.files.length == 0) {
        return client.raiseError("No images")
    }
    try {
        res = await db.query("INSERT INTO articles (title, userId, price, description) VALUES (?, ?, ?, ?)", [data.title, data.userId, data.price, data.description]);
        const articleId = res.insertId;
        for (let file of data.files) {
            var source =  get_url(file.path);
            const buffer = await readFile(source);
            const extension = file.mimetype.split("/")[1]
            res = await db.query("INSERT INTO article_images (articleId, extension) VALUES (?, ?)", [articleId, extension]);
            const photoId = res.insertId;
            const destination = path.resolve(PATH, "static", "articles", photoId + "." + extension);
            const writeRes = await writeFile(destination, buffer);
            const deleteRes = await unlink(source);
        }
        send_push({
            title: data.title,
            body: data.price,
        })
        client.success({
            articleId,
        })
    } catch(e) {
        console.error(e);
        client.raiseError("Exception");
    }
}