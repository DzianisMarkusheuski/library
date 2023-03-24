const assert = require("assert");
const request = require("supertest");
const { getBooks, getBookById } = require("../controllers/bookController.js");
const { getInstruction } = require("../controllers/baseController.js");
const { Server } = require("../models/server");

let server;

describe("server module", function () {
    this.beforeEach(function(){
        server = new Server();
        server.removeAllEvents();

        server.GET("/", async (request, response) => {
            try {
                let instruction = await getInstruction();
                response.end(instruction);
            } catch (error) {
                response.end(error.message);
            }
        });
        
        server.GET("/books", async (request, response) => {
            let books = await getBooks();
            response.write(JSON.stringify(books));
            response.end();
        });
        
        server.GET("/books/\\d+", async (request, response) => {
            let id = Number(/\d+$/.exec(request.url)[0]);
            let book = await getBookById(id);
            response.end(JSON.stringify(book));
        });

    });

    this.afterAll(function(){
        server.removeAllEvents();
    });
    
    it("input URL = '/' output instruction", function (done) {
        request(new Server()._server)
            .get("/")
            .expect(200)
            .expect(function (response) {
                assert.strictEqual(JSON.stringify(response.text), '"/           ====> this instruction\\r\\n/books      ====> all books JSON\\r\\n/books/<id> ====> one book with id \\"<id>\\" JSON"');
            }).end(done);
    });

    it("input URL = '/books' output all books", function (done) {
        request(new Server()._server)
            .get("/books")
            .expect(200)
            .expect(function (response) {
                assert.strictEqual(response.text, '[{"id":1,"name":"a"},{"id":2,"name":"b"},{"id":3,"name":"c"},{"id":4,"name":"d"}]');
            }).end(done);
    });

    it("input URL = '/books/1' output one book", function (done) {
        request(new Server()._server)
            .get("/books/1")
            .expect(200)
            .expect(function (response) {
                assert.strictEqual(response.text, '{"id":1,"name":"a"}');
            }).end(done);
    });

    it("resourse not found", function (done) {
        request(new Server()._server)
            .get("/sfdsdf")
            .expect(404)
            .expect("Not Found")
            .end(done);
    });


    it("method not implemented", function (done) {
        request(new Server()._server)
            .post("/sfdsdf")
            .expect(501)
            .expect("Not Implemented")
            .end(done);
    });

    it("bad port", function () {
        new Server().start("sdf");
        //log data in EACCES.txt file and output info to console
    });

    it("bad host", function () {
        new Server().start(8001, "sdf");
        //log data in ENOTFOUND.txt file and output info to console
    });
});