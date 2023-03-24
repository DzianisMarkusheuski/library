const assert = require("assert");
const { router, GET, removeAllEvents } = require("../routes/router.js");

let request = {
    url: "",
    method: ""
};

let response = {
    header: "",
    body: "",

    writeHead: function (header) {
        this.header += header;
    },
    write: function (body) {
        this.body += body;
    },
    end: function (body = "") {
        this.body += body;
    }
}

describe("router module GET", function () {
    beforeEach(function () {
        response.header = "";
        response.body = "";
        removeAllEvents();
    });
    
    this.afterAll(function(){
        removeAllEvents();
    });

    it("method not allowed", function () {
        request.method = "GET1";
        request.url = "/";

        router(request, response);
        assert.deepStrictEqual({ header: response.header, body: response.body }, { header: "501", body: "Not Implemented" });
    });

    it("resource not found", function () {
        request.method = "GET";
        request.url = "/jdkjgkdfjgkdlfjgkj";

        router(request, response);
        assert.deepStrictEqual({ header: response.header, body: response.body }, { header: "404", body: "Not Found" });
    });

    it("GET / ", function () {
        request.method = "GET";
        request.url = "/";

        GET("/", (request, response) => {
            response.writeHead(200);
            response.write("hello world");
            response.end();
        });

        router(request, response);
        assert.deepStrictEqual({ header: response.header, body: response.body }, { header: "200", body: "hello world" });
    });

    it("GET /books ", function () {
        request.method = "GET";
        request.url = "/books";

        GET("/books", (request, response) => {
            response.writeHead(200);
            response.write("books");
            response.end();
        });

        router(request, response);
        assert.deepStrictEqual({ header: response.header, body: response.body }, { header: "200", body: "books" });
    });

    it("GET /books/123 ", function () {
        request.method = "GET";
        request.url = "/books/123";

        GET("/books/\\d+", (request, response) => {
            response.writeHead(200);
            response.write(request.url);
            response.end();
        });
        
        router(request, response);
        assert.deepStrictEqual({ header: response.header, body: response.body }, { header: "200", body: request.url });
    });
});