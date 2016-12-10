import { hello } from '../controllers/dummy.controllers'

export default [
  {
    method: 'GET',
    path: '/api/hello',
    config: hello,
  },
]
