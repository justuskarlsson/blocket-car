const db = require('../db')
const fs = require('fs')
const {promisify} = require('util')
const path = require('path') 

const PATH = process.cwd();
const get_url = (name) => path.resolve(PATH, "static", "articles", name);
const unlink = promisify(fs.unlink);

module.exports = async (client, data) => {
    try {
        let res = await db.query(
            `DELETE FROM articles WHERE id = ?
            `, [data.id]);
        if (res.length == 0) client.raiseError("article not found")
        let article = res[0];

        let images = await db.query("SELECT id, articleId, extension FROM article_images WHERE articleId = ?", [data.id])
        let sqlRes = await db.query("DELETE FROM article_images WHERE articleId = ?", [data.id])
        for (let image of images) {
            // Delete image
            let source = get_url(image.id + "." + image.extension)
            let deleteRes = await unlink(source)
        }
        client.success({id: data.id});

    } catch (e) {
        console.error(e)
        client.raiseError("Error")
    }
}