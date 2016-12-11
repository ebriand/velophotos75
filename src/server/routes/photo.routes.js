import { getCollections, getPhotoset, getPhoto, incPhotoView } from '../controllers/photo.controllers'

export default [
  {
    method: 'GET',
    path: '/api/collection',
    config: getCollections,
  },
  {
    method: 'GET',
    path: '/api/photoset/{id}',
    config: getPhotoset,
  },
  {
    method: 'GET',
    path: '/api/photo/{id}',
    config: getPhoto,
  },
  {
    method: 'PUT',
    path: '/api/view/{id}',
    config: incPhotoView,
  },
]
