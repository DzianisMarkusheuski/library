const assert = require("assert");
const { getBooks, getBookById, deleteBookById, insertBooks, dropLibrary, updateBookById } = require("../controllers/bookController.js");
var booksInDB = [
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
];

describe("controller module", function () {
    this.beforeEach(function (end) {
        dropLibrary().then(_ => {
            insertBooks(booksInDB).then(_ => {
                end();
            });
        });
    });

    this.afterEach(function (end) {
        dropLibrary().then(_ => {
            insertBooks(booksInDB).then(_ => {
                end();
            });
        });
    })

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

    it("delete book by id", async function () {
        var data = await deleteBookById(3);
        assert.deepStrictEqual(data, 1);

        data = await getBooks();
        booksInDB.splice(2, 1);
        assert.deepStrictEqual(data, booksInDB);
    });

    it("insert book", async function () {
        var data = await insertBooks([{ "id": 5, "name": "d" }]);
        assert.deepStrictEqual(data, 1);

        data = await getBooks();
        booksInDB.push({ "id": 5, "name": "d" });
        assert.deepStrictEqual(data, booksInDB);
    });

    it("update book", async function () {
        var data = await updateBookById(2, { "id": 2, "name": "denis" });
        assert.deepStrictEqual(data, 1);

        data = await getBooks();
        booksInDB[1]["name"] = "denis";
        assert.deepStrictEqual(data, booksInDB);
    });
});