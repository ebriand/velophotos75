import Promise from 'bluebird'
import rp from 'request-promise'
import _ from 'lodash'

const request = rp.defaults({
  json: true,
})

const flickrURL = process.env.FLICKR_URL || 'https://api.flickr.com/services/rest/'
if (!process.env.FLICKR_USER_ID || !process.env.FLICKR_API_KEY) {
  throw new Error('Setting FLICKR_USER_ID and FLICKR_API_KEY as env variables is mandatory')
}
const flickrUserId = process.env.FLICKR_USER_ID
const flickrApiKey = process.env.FLICKR_API_KEY
const flickrURLParams = `&api_key=${flickrApiKey}&user_id=${flickrUserId}&format=json&nojsoncallback=1`

const getPhotoUrl = (farmId, serverId, photoId, secret, size) => {
  return `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_${size}.jpg`
}

const getCollectionsInfo = () => {
  return request(`${flickrURL}?method=flickr.collections.getTree${flickrURLParams}`)
    .then((result) => {
      return Promise.resolve(result.collections.collection)
    })
}

const getPhotosetsInfo = () => {
  return request(`${flickrURL}?method=flickr.photosets.getList${flickrURLParams}`)
    .then((result) => {
      return Promise.resolve(result.photosets.photoset)
    })
}

export const getCollections = () => {
  return Promise.all([getCollectionsInfo(), getPhotosetsInfo()])
    .then((results) => {
      const collectionsInfo = results[0]
      const photosetsInfo = _.keyBy(results[1], 'id')
      return Promise.resolve(_.map(collectionsInfo, (collectionInfo) => {
        return {
          title: collectionInfo.title,
          photosets: _.map(collectionInfo.set, (photoset) => {
            const photosetInfo = _.merge(photoset, photosetsInfo[photoset.id])
            return {
              id: photosetInfo.id,
              /* eslint no-underscore-dangle: ["error", { "allow": ["_content"] }] */
              title: photosetInfo.title._content,
              cover: getPhotoUrl(photosetInfo.farm,
               photosetInfo.server,
               photosetInfo.primary,
               photosetInfo.secret,
               'm',
             ),
            }
          }),
        }
      }))
    })
}

export const getPhotoset = (photosetId) => {
  return request(`${flickrURL}?method=flickr.photosets.getInfo&photoset_id=${photosetId}${flickrURLParams}`)
}
