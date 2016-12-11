import _ from 'lodash'
import staticRoutes from './static.routes'
import photoRoutes from './photo.routes'

export default () => {
  const routers = [staticRoutes, photoRoutes]
  return _.flatten(routers)
}
