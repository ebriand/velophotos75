const { mongo } = require("../config");

const photosetSchema = require("./photoset");
const viewsSchema = require("./views");

const db = mongoose.createConnection(mongo.uri);

module.exports = {
  views: db.model("Views", viewsSchema),
  photosets: db.model("Photoset", photosetSchema)
};
