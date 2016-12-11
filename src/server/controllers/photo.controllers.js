import * as FlickrService from '../services/flickr.service'
import * as ViewsService from '../services/views.service'

export const getCollections = {
  handler: (req, reply) => {
    FlickrService.getCollections().then((collections) => {
      reply(collections)
    })
  },
}

export const getPhotoset = {
  handler: (req, reply) => {
    FlickrService.getPhotoset(req.params.id).then((photoset) => {
      reply(photoset)
    })
    ViewsService.incPhotosetView(req.params.id)
  },
}

export const incPhotoView = {
  handler: (req, reply) => {
    ViewsService.incPhotoView(req.params.id)
    reply()
  },
}
