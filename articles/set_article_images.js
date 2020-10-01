const db = require('../db')

module.exports =  async (client, article) => {
    let images = await db.query("SELECT id, articleId, extension FROM article_images WHERE articleId = ?", [article.id])
    article.images = []
    for (let image of images) {
        article.images.push({
            name: image.id + "." + image.extension,
        })
    }
    return article
}