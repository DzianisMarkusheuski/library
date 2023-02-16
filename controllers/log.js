const { appendFileSync } = require("fs");

exports.log = function (fileName, message) {
    appendFileSync(`./.logs/${fileName}`, `\n${new Date()} ${message}`);
}