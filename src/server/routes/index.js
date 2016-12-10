import _ from 'lodash'
import staticRoutes from './static.routes'
import dummyRoutes from './dummy.routes'

export default () => {
  const routers = [staticRoutes, dummyRoutes]
  return _.flatten(routers)
}
