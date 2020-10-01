const db = require('../db')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

const login_token = async (client, data) => {
    try {
        let sessionRes = await db.query("SELECT * FROM user_sessions WHERE token = ?", [data.token]);
        if (sessionRes.length === 0) {
            return client.raiseError("token did not match");
        }
        client.auth = true;
        client.id = sessionRes[0].userId; 
    } catch (e) {
        console.error(e);
        return client.rasieError(e.constructor.name)
    }
}

module.exports = async (client, data) => {
    if (data.token) {
        await login_token(client, data)
        return 
    }
    try {
        console.log(data)
        let res = await db.query("SELECT company, id, passwordHash FROM users WHERE email = ?", [data.email]);
        if (res.length == 0) return client.raiseError("No such user");
        const user = res[0];
        let correctHash = user.passwordHash;
        let doesMatch = await bcrypt.compare(data.password, correctHash);
        if (!doesMatch) {
            return client.raiseError("Password doesn't match")
        }
        let token = crypto.randomBytes(64).toString("hex");
        let tokenRes = await db.query("INSERT INTO user_sessions (token, userId) VALUES (?, ?)", [token, user.id])
        client.success({
            token,
            id: user.id,
            company: user.company,
        });
        
    } catch(e) {
        console.error(e);
        return client.rasieError(e.constructor.name)
    }
}