import { assets, index } from '../controllers/static.controllers'

export default [
  {
    method: 'GET',
    path: '/public/{path*}',
    config: assets,
  },
  {
    method: 'GET',
    path: '/',
    config: index,
  },
]
