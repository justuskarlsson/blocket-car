const db = require('../db')
var {Expo} = require('expo-server-sdk');
console.log(Expo.isExpoPushToken)
let expo = new Expo();

module.exports = async (data) => {
    data = Object.assign({
        title: "Test",
        sound: "default",
        body: "TEST",
        data: { withSome: 'data'},
    }, data)
    try {
        let res = await db.query("SELECT * FROM user_push_tokens");
        let pushes = []
        for (let session of res) {
            if (!Expo.isExpoPushToken(session.pushToken)) {
                console.error(`Push token ${pushToken} is not a valid Expo push token`);
                continue;
            }
        
            // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
            pushes.push({
                to: session.pushToken,
                title: data.title,
                sound: data.sound,
                body: data.body,
                data: data.data,
                priority: "high",
            })
        }
      
        let chunks = expo.chunkPushNotifications(pushes);
        console.log(chunks)
      
        for (let chunk of chunks) {
              let receipts = await expo.sendPushNotificationsAsync(chunk);
        }

    } catch (e){
        console.log("Push error: ", e)
    }
}