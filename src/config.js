module.exports = {
  flickr: {
    host: process.env.FLICKR_HOST,
    userId: process.env.FLICKR_USER_ID,
    apiKey: process.env.FLICKR_API_KEY
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
};
