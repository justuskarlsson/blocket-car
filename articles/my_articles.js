const db = require('../db')
const get_auth = require('../users/get_auth')
const set_article_images = require('./set_article_images')

module.exports = async (client, data) => {
    try {
        let userId = await get_auth(client, data);
        if (userId === -1) {
            return client.raiseError("bad token");
        }
        // console.log("User ID from my_articles: " + userId) // AWAIT BRE!!!
        let articles = await db.query(
            `SELECT articles.id, articles.dateAdded, articles.title, articles.price, articles.description, users.company
             FROM articles INNER JOIN users ON articles.userId = users.id
             WHERE articles.userId = ? 
             ORDER BY articles.dateAdded DESC
             LIMIT 10
            `, [userId]);

        for (var i = 0; i < articles.length; i++) {
            await set_article_images(client, articles[i]);    
        }
        client.success(articles);

    } catch (e) {
        let type = e.constructor.name;
        console.log(e);
        client.raiseError(type);
    }
}
