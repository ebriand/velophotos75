import Promise from 'bluebird'
import _ from 'lodash'
import * as FlickrService from '../services/flickr.service'
import * as ViewsService from '../services/views.service'

export const getCollections = {
  handler: (req, reply) => {
    Promise.all([FlickrService.getCollections(), ViewsService.getPhotosetViews()])
      .then((results) => {
        const collections = results[0]
        const photosetViews = _.keyBy(results[1], 'flickrId')
        reply(_.map(collections, (collection) => {
          return {
            ...collection,
            photosets: _.map(collection.photosets, (photoset) => {
              return {
                ...photoset,
                nbViews: photosetViews[photoset.id] ? photosetViews[photoset.id].nbViews : 0,
              }
            }),
          }
        }))
      })
  },
}

export const getPhotoset = {
  handler: (req, reply) => {
    FlickrService.getPhotoset(req.params.id).then((photoset) => {
      reply(photoset)
    })
    ViewsService.increment(req.params.id, true)
      .then(() => {})
  },
}

export const incPhotoView = {
  handler: (req, reply) => {
    ViewsService.increment(req.params.id)
      .then(() => reply())
  },
}
