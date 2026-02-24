
const toJson = (data) => JSON.stringify(data,null, 2);


const fromJson = (data) => JSON.parse(data);

module.exports = {
    toJson,
    fromJson
}