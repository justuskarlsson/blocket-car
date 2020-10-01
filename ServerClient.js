class ServerClient {
    constructor(res) {
        this.res = res;
    }

    raiseError(message){
        this.res.json({
            status: 'error',
            message,
            data: {},
        })
    }

    success(data) {
        this.res.json({
            status: 'success',
            message: "",
            data
        })
    }
}

module.exports = ServerClient