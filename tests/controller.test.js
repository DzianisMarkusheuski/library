const assert = require("assert");
const { getBooks, getBookById } = require("../controllers/bookController.js");
const booksInDB = [
    {
        "id": 1,
        "name": "a"
    },
    {
        "id": 2,
        "name": "b"
    },
    {
        "id": 3,
        "name": "c"
    },
    {
        "id": 4,
        "name": "d"
    }
]
describe("controller module", function () {
    it("get all books", function () {
        return getBooks().then(data => {
            assert.deepStrictEqual(data, booksInDB);
        });
    });

    it("get book by id", function () {
        return getBookById(3).then(data => {
            assert.deepStrictEqual(data, booksInDB[2]);
        });
    });
});