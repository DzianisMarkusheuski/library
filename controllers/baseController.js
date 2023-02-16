const { readFile } = require("fs").promises;

exports.getInstruction = async function(){
    return await readFile("./public/instruction.txt");
}