const WebSocket = require('ws');
const db = require('./db')

const wss = new WebSocket.Server({ port: 8314 });

const clients = {};
console.log("LEGACY SOCKET!!!!")

let clientCount = 0;
class Client {
    constructor(index, ws) {
        this.index = index;
        this.ws = ws;
        this.id = index;
        this.imageCount = 0;
        this.token = "";
        this.pushToken = "";
        this.auth = false;
    }
    
    raiseError(message) {
        this.ws.send(JSON.stringify({
            status: 'error',
            message,
            data: {}
        }))
    }
}

const handlers = {};
const rawHandlers = {};

wss.on("connection", (ws) => {
    let client = new Client(clientCount, ws);
    clients[clientCount++] = client;
    console.log("Client connected: ", clientCount);
    ws.on('message', (data)=> {
        data = JSON.parse(data);
        if(data.route in handlers) {
            handlers[data.route](client, data);
        } else if(data.route in rawHandlers) {
            rawHandlers[data.route](client, data);
        }
    });
    ws.on("close", ()=> {
        console.log("Client disconnected: ", client.index);
        delete clients[client.index];
    })
})



const app = {};
app.db = db;
// Implicit JSON
app.on = (route, func) => {
    handlers[route] = func;
}

app.onRaw = (route, func) => {
    rawHandlers[route] = func;
}   

module.exports = app;