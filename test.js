const db = require('./db')

const getUser = () => {
    return db.query("SELECT username FROM users where username = 'b' ");
}


const test = async () => {
    const res = await getUser();
    console.log(res);
    console.log(res.length == 0)
}


test();