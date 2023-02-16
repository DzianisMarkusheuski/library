const { Server } = require("./models/server.js");
const { getBooks, getBookById } = require("../controllers/bookController.js");
const { getInstruction } = require("../controllers/baseController.js");

let server = new Server();

server.get("/", async (request, response) => {
    try {
        let instruction = await getInstruction();
        response.end(instruction);
    } catch (error) {
        response.end(error.message);
    }
});

server.get("/books", async (request, response) => {
    let books = await getBooks();
    response.write(JSON.stringify(books));
    response.end();
});

server.get("/books/\\d+", async (request, response) => {
    let id = Number(/\d+$/.exec(request.url)[0]);
    let book = await getBookById(id);
    response.end(JSON.stringify(book));
});

server.start();