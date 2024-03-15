const { MongoClient } = require("mongodb");
const { readFile } = require("fs").promises;

exports.getInstruction = async function(){
    return await readFile("./public/instruction.txt");
}

exports.getInitDBClient = async function(){
    let client = new MongoClient("mongodb://127.0.0.1:27017");
    await client.connect();
    return client;
}

exports.getVideo = async function(){
    return await readFile("./public/test.mp4");
}