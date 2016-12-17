import mongoose from 'mongoose'
import Promise from 'bluebird'

if (!process.env.MONGO_URI) {
  throw new Error('Setting MONGO_URI as env variables is mandatory')
}

// Set bluebird as promise lib
mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URI, { promiseLibrary: Promise })

const viewsSchema = new mongoose.Schema({
  nbViews: Number,
  flickrId: String,
  photoset: Boolean,
})

const viewsModel = mongoose.model('Views', viewsSchema)

export const getPhotosetViews = () => viewsModel.find({ photoset: true })

export const getPhotoViews = photoIds => viewsModel.find({ flickrId: { $in: photoIds } })

export const findByFlickrId = flickrId => viewsModel.findOne({ flickrId })

export const increment = (flickrId, isPhotoset) =>
  viewsModel.update(
    { flickrId },
    {
      $inc: { nbViews: 1 },
      $set: { photoset: isPhotoset },
    },
    { upsert: true },
  )
