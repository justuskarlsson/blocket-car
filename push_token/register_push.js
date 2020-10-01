const db = require('../db')
const get_auth = require('../users/get_auth')
var Expo = require('expo-server-sdk');

module.exports = async (client, data) => {
    try {
        let userId = await get_auth(client, {token: data.token})
        if (userId === -1) {
            return client.raiseError("token does not exist")
        }
        var res = await db.query(`INSERT INTO user_push_tokens (pushToken, userId) VALUES (?, ?)`, [data.pushToken, userId])
        console.log(res);
        client.success({})

    } catch (e){
        console.log("Register push: ", e)
    }
}