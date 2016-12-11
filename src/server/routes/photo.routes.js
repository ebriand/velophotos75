import { getCollections, getPhotoset, incPhotoView } from '../controllers/photo.controllers'

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
    method: 'PUT',
    path: '/api/view/{id}',
    config: incPhotoView,
  },
]
