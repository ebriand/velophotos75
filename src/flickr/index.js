const collections = require("./collections");
const photosets = require("./photosets");
const photoset = require("./photoset");

module.exports = {
  getCollections: collections.get,
  getPhotosets: photosets.get,
  getPhotoset: photoset.get
};
