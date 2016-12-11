import * as FlickrService from '../services/flickr.service'

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
  },
}

export const getPhoto = {
  handler: (req, reply) => {
    reply('Hello World!')
  },
}

export const incPhotoView = {
  handler: (req, reply) => {
    reply('Hello World!')
  },
}
