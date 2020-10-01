const db = require('../db')
const bcrypt = require('bcrypt')

module.exports = async (client, data) => {
    try {
        var res = await db.query("SELECT email FROM users WHERE email = ?", data.email);
        
        if (res.length != 0) return client.raiseError("username-exists");
        
        if (data.password1 != data.password2) return client.raiseError("The password does not match");
        let hash = await bcrypt.hash(data.password1, 5)

        var res = await db.query("INSERT INTO users (email, passwordHash, firstName, lastName, company) VALUES (?, ?, ?, ?, ?)", [data.email, hash, data.firstName, data.lastName, data.company]);
        client.success({
            id: res.insertId
        })
  
    } catch (e) {
        console.error(e);
    }
}