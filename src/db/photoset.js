const mongoose = require("mongoose");

const photosetSchema = new mongoose.Schema({
  flickrId: {
    type: String,
    unique: true
  },
  photoset: Object,
  photos: Object
});

module.exports = {
  photosetSchema
};
