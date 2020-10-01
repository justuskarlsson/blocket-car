const sendPushAll = require('./send_push_all')

module.exports = async (client, data) => {
    await sendPushAll({});
    client.success({})
}