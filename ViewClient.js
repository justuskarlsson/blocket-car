class ViewClient {
    constructor(res, view) {
        this.res = res;
        this.view = view;
    }

    raiseError(message){
        this.res.render(this.view, {
            status: "error",
            data: {}, 
            message, 
        })
    }

    success(data) {
        this.res.render(this.view, {
            status: "success", 
            data, 
            message: "",
        })
    }
}

module.exports = ViewClient