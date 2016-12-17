import _ from 'lodash'
import staticRoutes from './static.routes'
import photoRoutes from './photo.routes'

export default () => _.flatten([staticRoutes, photoRoutes])
