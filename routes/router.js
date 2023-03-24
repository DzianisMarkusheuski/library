const Emitter = require("events");

let emitter = new Emitter();
let methods = Object.create(null);

exports.GET = methods["GET"] = function (eventUrl, callback) {
    emitter.on("^GET" + eventUrl + "$", callback);
}

exports.PUT = methods["PUT"] = function (eventUrl, callback) {
    emitter.on("^PUT" + eventUrl + "$", callback);
}

exports.DELETE = methods["DELETE"] = function (eventUrl, callback) {
    emitter.on("^DELETE" + eventUrl + "$", callback);
}

exports.POST = methods["POST"] = function (eventUrl, callback) {
    emitter.on("^POST" + eventUrl + "$", callback);
}

exports.removeAllEvents = function () {
    emitter.removeAllListeners();
}

exports.router = function (request, response) {
    if (!methods[request.method])
        notAllow(response);
    else {
        let events = emitter.eventNames();
        for (let event of events) {
            if (new RegExp(event).test(request.method + request.url)) {
                emitter.emit(event, request, response);
                return;
            }
        }
        notFound(response);
    }
}

function notFound(response) {
    response.writeHead(404);
    response.write("Not Found")
    response.end();
}

function notAllow(response) {
    response.writeHead(501);
    response.write("Not Implemented")
    response.end();
}