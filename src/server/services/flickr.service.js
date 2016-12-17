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


const getCollectionsInfo = () =>
  request(`${flickrURL}?method=flickr.collections.getTree${flickrURLParams}`)
    .then(result => Promise.resolve(result.collections.collection))

const getPhotosetsInfo = () =>
  request(`${flickrURL}?method=flickr.photosets.getList${flickrURLParams}`)
    .then(result => Promise.resolve(result.photosets.photoset))

const getPhotoUrl = (farmId, serverId, photoId, secret, size) =>
  `https://farm${farmId}.staticflickr.com/${serverId}/${photoId}_${secret}_${size}.jpg`

export const getCollections = () =>
  Promise.all([getCollectionsInfo(), getPhotosetsInfo()])
    .then(([collectionsInfo, photosetsInfo]) => {
      const idxPhotosetsInfo = _.keyBy(photosetsInfo, 'id')
      return Promise.resolve(_.map(collectionsInfo, (collectionInfo) => {
        return {
          title: collectionInfo.title,
          photosets: _.map(collectionInfo.set, (photoset) => {
            const photosetInfo = idxPhotosetsInfo[photoset.id]
            return {
              ...photoset,
              cover: getPhotoUrl(photosetInfo.farm,
               photosetInfo.server,
               photosetInfo.primary,
               photosetInfo.secret,
               'm',
             ),
              photos: parseInt(photosetInfo.photos, 10),
              date: new Date(parseInt(photosetInfo.date_create, 10) * 1000),
            }
          }),
        }
      }))
    })

export const getPhotoset = photosetId =>
  request(`${flickrURL}?method=flickr.photosets.getPhotos&photoset_id=${photosetId}${flickrURLParams}`)
    .then(({ photoset }) =>
      Promise.resolve({
        title: photoset.title,
        photos: _.map(photoset.photo, (photo) => {
          return {
            id: photo.id,
            title: photo.title,
            url: getPhotoUrl(photo.farm,
             photo.server,
             photo.id,
             photo.secret,
             'b',
            ),
            thumbnailUrl: getPhotoUrl(photo.farm,
             photo.server,
             photo.id,
             photo.secret,
             'n',
            ),
          }
        }),
      }),
    )
