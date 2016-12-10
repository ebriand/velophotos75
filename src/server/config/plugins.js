import inert from 'inert'
import good from 'good'

export default [
  {
    register: inert,
  },
  {
    register: good,
    options: {
      ops: {
        interval: 1000,
      },
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            log: '*',
            response: '*',
          }],
        },
        {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  },
]
