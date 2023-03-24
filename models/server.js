const { createServer } = require("http");
const { log } = require("../controllers/log.js");
const { router, removeAllEvents } = require("../routes/router.js");
const { PUT, DELETE, POST, GET } = require("../routes/router.js");

exports.Server = class Server {
    constructor() {
        this._server = createServer((request, response) => {
            router(request, response);
        });

        this._server.on("error", this._onError);
    }

    _onError(error) {
        if (error.code === "EACCES") {
            log("EACCES.txt", error.message);
            console.log(error.message);
        } else if (error.code === "ENOTFOUND") {
            log("ENOTFOUND.txt", error.message);
            console.log(error.message);
        } else {
            throw error;
        }
    }

    start(port = 3000, host = "127.0.0.1") {
        return this._server.listen(port, host, () => {
            console.log(`server has been started on ${host}:${port}`);
        })
    }

    close() {
        this._server.close();
    }

    GET(eventUrl, callback){
        GET(eventUrl, callback);
    }

    PUT(eventUrl, callback){
        PUT(eventUrl, callback);
    }

    DELETE(eventUrl, callback){
        DELETE(eventUrl, callback);
    }

    POST(eventUrl, callback){
        POST(eventUrl, callback);
    }

    removeAllEvents(){
        removeAllEvents();
    }
}