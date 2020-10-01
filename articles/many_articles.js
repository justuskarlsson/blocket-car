const db = require('../db')
const set_article_images = require('./set_article_images')

module.exports = async (client, data) => {
    try {
        let articles = await db.query(
            `SELECT articles.id, articles.dateAdded, articles.title, articles.price, articles.description, users.company
             FROM articles INNER JOIN users ON articles.userId = users.id 
             ORDER BY articles.dateAdded DESC
             LIMIT 10
            `);
        
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

const test = async () => {
    let articles = await db.query(
        `SELECT articles.id, articles.dateAdded, articles.title, articles.price, articles.description, users.company
         FROM articles INNER JOIN users ON articles.userId = users.id LIMIT 10
        `);
    
    for (var i = 0; i < articles.length; i++) {
        await set_article_images({}, articles[i]);    
    }
    console.log(articles)
}