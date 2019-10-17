const mongoose = require("mongoose");

var viewsSchema = new mongoose.Schema({
  nbViews: Number,
  flickrId: {
    type: String,
    unique: true
  },
  photoset: Boolean
});

viewsSchema.statics.getPhotosetViews = function() {
  return this.find({ photoset: true }).exec();
};

viewsSchema.statics.getPhotoViews = function(photoIds) {
  return this.find({ flickrId: { $in: photoIds } }).exec();
};

viewsSchema.statics.findByFlickrId = function(flickrId) {
  return this.findOne({ flickrId: flickrId }).exec();
};

viewsSchema.statics.increment = function(flickrId, isPhotoset) {
  this.update(
    { flickrId: flickrId },
    { $inc: { nbViews: 1 }, $set: { photoset: isPhotoset } },
    { upsert: true },
    function() {}
  );
};

viewsSchema.statics.getTopViews = function() {
  return this.find({ photoset: { $exists: false } })
    .sort({ nbViews: -1 })
    .limit(50)
    .exec();
};
