import Promise from 'bluebird'
import _ from 'lodash'
import * as FlickrService from '../services/cachedFlickr.service'
import * as ViewsService from '../services/views.service'

export const getCollections = {
  handler: (req, reply) => {
    Promise.all([FlickrService.getCollections(), ViewsService.getPhotosetViews()])
      .then(([collections, photosetViews]) => {
        const idxPhotosetViews = _.keyBy(photosetViews, 'flickrId')
        reply(_.map(collections, (collection) => {
          return {
            ...collection,
            photosets: _.map(collection.photosets, (photoset) => {
              return {
                ...photoset,
                nbViews: idxPhotosetViews[photoset.id] ? idxPhotosetViews[photoset.id].nbViews : 0,
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
