import Promise from 'bluebird'
import NodeCache from 'node-cache'
import * as FlickrService from './flickr.service'

Promise.promisifyAll(NodeCache.prototype)
const flickrCache = new NodeCache({ stdTTL: process.env.INDEX_TTL || 10, checkperiod: 1 })

const fillCollectionsCache = () =>
  FlickrService.getCollections()
  .then((collections) => {
    flickrCache.set('collections', collections)
    return Promise.resolve(collections)
  })

fillCollectionsCache()

flickrCache.on('expired', (key) => {
  switch (key) {
    case 'collections':
      fillCollectionsCache()
      break
    default:
      console.log('Unknown cache entry', key)
  }
})

const cacheGetCollections = () => {
  return flickrCache.getAsync('collections')
  .then((cachedCollections) => {
    if (cachedCollections === undefined) {
      return fillCollectionsCache()
    }
    return Promise.resolve(cachedCollections)
  })
}

export const getCollections = cacheGetCollections

export const getPhotoset = photosetId => FlickrService.getPhotoset(photosetId)
