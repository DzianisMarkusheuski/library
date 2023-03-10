const { getInitDBClient } = require("./baseController");

exports.getBooks = async function () {
    try {
        var client = await getInitDBClient();
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
    try {
        var client = await getInitDBClient();
        let collection = client.db("library").collection("books");

        let book = await collection.findOne({ "id": id }, { projection: { "_id": 0 } });
        return book;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}

exports.deleteBookById = async function (id) {
    try {
        var client = await getInitDBClient();
        let collection = client.db("library").collection("books");

        let result = await collection.deleteOne({ "id": id });
        return result.deletedCount;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}

exports.dropLibrary = async function () {
    try {
        var client = await getInitDBClient();
        let collection = client.db("library").collection("books");

        let result = await collection.deleteMany({});
        return result.deletedCount;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}

exports.insertBooks = async function (books) {
    try {
        var client = await getInitDBClient();
        let collection = client.db("library").collection("books");

        let result = await collection.insertMany(books, { "forceServerObjectId": true });
        return result.insertedCount;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}

exports.updateBookById = async function (id, book) {
    try {
        var client = await getInitDBClient();
        let collection = client.db("library").collection("books");
        let newBook = { $set: { "id": book["id"], "name": book["name"] } };
        let result = await collection.updateOne({ "id": id }, newBook);
        return result.modifiedCount;
    } catch (error) {
        throw error;
    } finally {
        client.close();
    }
}