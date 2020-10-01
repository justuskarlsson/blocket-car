const db = require('../db')

module.exports = async (client, data) => {
    try {
        let res = await db.query(
            `SELECT articles.id, articles.title, articles.dateAdded, articles.price, articles.description, users.company
             FROM articles INNER JOIN users ON articles.userId = users.id  WHERE articles.id = ? 
            `, [data.id]);
        if (res.length == 0) client.raiseError("article not found")
        let article = res[0];

        let images = await db.query("SELECT id, articleId, extension FROM article_images WHERE articleId = ?", [article.id])
        article.images = []
        for (let image of images) {
            article.images.push({
                name: image.id + "." + image.extension,
            })
        }
        client.success(article);

    } catch (e) {
        console.error(e)
        client.raiseError("Error")
    }
}