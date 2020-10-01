const db = require('../db')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

/**
 * Returns -1 if token does not exist
 */
module.exports = async (client, data) => {
    try {
        let sessionRes = await db.query("SELECT * FROM user_sessions WHERE token = ?", [data.token]);
        if (sessionRes.length === 0) {
            return -1;
        }
        return sessionRes[0].userId;
    } catch (e) {
        client.raiseError(e.constructor.name);
        console.error(e);
        return -1
    }
}