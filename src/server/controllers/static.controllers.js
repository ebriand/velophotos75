const publicPath = './public'

export const assets = {
  handler: {
    directory: { path: publicPath },
  },
}

export const index = {
  handler: (request, reply) => {
    reply.file(`${publicPath}/index.html`)
  },
}
