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

// eslint-disable-next-line import/no-mutable-exports
let viewModel

viewsSchema.statics.getPhotosetViews = () => {
  return viewModel.find({ photoset: true })
}

viewsSchema.statics.getPhotoViews = (photoIds) => {
  return viewModel.find({ flickrId: { $in: photoIds } })
}

viewsSchema.statics.findByFlickrId = (flickrId) => {
  return viewModel.findOne({ flickrId })
}

viewsSchema.statics.increment = (flickrId, isPhotoset) => {
  return viewModel.update(
    { flickrId },
    {
      $inc: { nbViews: 1 },
      $set: { photoset: isPhotoset },
    },
    { upsert: true },
  )
}

viewModel = mongoose.model('Views', viewsSchema)
export default viewModel
