const { MongoClient } = require("mongodb");
exports.getBooks = async function () {
    let client = new MongoClient("mongodb://127.0.0.1:27017");
    try {
        await client.connect();
        let collection = client.db("library").collection("books");
        let books = await collection.find({}, { projection: { "_id": 0 } }).toArray();
        return books;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}

exports.getBookById = async function (id) {
    let client = new MongoClient("mongodb://127.0.0.1:27017");
    try {
        await client.connect();
        let collection = client.db("library").collection("books");
        let book = await collection.findOne({ "id": id }, { projection: { "_id": 0 } });
        return book;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}