var mysql      = require('promise-mysql');
let options = {
    connectionLimit: 20,
    host     : 'localhost',
    user     : 'hj_bilar',
    password : 'a',
    database : 'hj_bilar'
};
const pool = mysql.createPool(options);

module.exports = pool;


const articles = {
    title: 'title',

}


const test = async () => {
    try {
        let res = await pool.query('SELECT * from articles');
        for (var col of res) {
            //console.log(col);
            console.log(col.date_added - new Date())
        }
    } catch (e) {
        console.log(e);
    }

}

