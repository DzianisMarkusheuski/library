const { Server } = require("./models/server.js");
const { getBooks, getBookById } = require("./controllers/bookController.js");
const { deleteBookById } = require("./controllers/bookController.js");
const { insertBooks, updateBookById } = require("./controllers/bookController.js");
const { getInstruction } = require("./controllers/baseController.js");

let server = new Server();

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

server.DELETE("/books/\\d+", async (request, response) => {
    let id = Number(/\d+$/.exec(request.url)[0]);
    let number = await deleteBookById(id);
    response.end(`${number}`);
});

server.POST("/books", (request, response) => {
    request.on("data", async data => {
        try {
            let number = await insertBooks(JSON.parse(data.toString()));
            response.end(`${number}`);
        } catch (error) {
            response.writeHead(500);
            response.write(error.message);
            response.end();
        }
    })
});

server.PUT("/books/\\d+", async (request, response) => {
    let id = Number(/\d+$/.exec(request.url)[0]);
    request.on("data", async data => {
        try {
            data = JSON.parse(data.toString());
            if (!Object.keys(data).includes('id')) throw new NoTypeData("Object hasn't 'id'", 400);
            if (!Object.keys(data).includes('name')) throw new NoTypeData("Object hasn't 'name'", 400);

            let number = await updateBookById(id, data);
            response.end(`${number}`);
        } catch (error) {
            response.writeHead(error.code ? error.code : 500);
            response.write(error.message);
            response.end();
        }
    })
});


class NoTypeData extends Error {
    constructor(message, code) {
        super(message);
        this.code = code;
    }
}

server.start();