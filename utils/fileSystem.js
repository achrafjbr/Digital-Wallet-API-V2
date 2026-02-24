const fs = require('fs');
const { toJson, fromJson } = require('../utils/serialization');

const writeJson = (response, newData) => {
    try {
        fs.writeFileSync("data.json", toJson(newData, null, 2));
    } catch (error) {
        response.writeHeader(500)
        response.end("something went wrong")
    }
}

const readJson = (response) => {
    try {
        const data = fs.readFileSync("data.json", "utf-8");
        return fromJson(data)
    } catch (error) {
        response.writeHeader(500)
        response.end("something went wrong")
    }
}

module.exports = {
    writeJson,
    readJson
}