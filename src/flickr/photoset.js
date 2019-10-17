"use strict";

const fetch = require("node-fetch");

const { url } = require("./utils");

const FLICKR_METHOD = "flickr.photosets.getPhotos";
const FLICKR_EXTRA_PARAMS = "extras=url_n,url_o";

async function get(id) {
  const photoset = await fetchPhotoset(id, 1);
  for (let i = 2; i <= photoset.pages; i++) {
    const morePhotoset = await fetchPhotoset(id, i);
    photoset.photo = photoset.photo.concat(morePhotoset.photo);
  }
  return Promise.resolve(photoset.photo);
}

async function fetchPhotoset(id, page = 1) {
  const response = await fetch(
    url({
      method: FLICKR_METHOD,
      extrasParams: `photoset_id=${id}&${FLICKR_EXTRA_PARAMS}`,
      page
    })
  );
  if (!response.ok) {
    throw new Error("Error fetching photoset");
  }
  const data = await response.json();
  return Promise.resolve(data.photoset);
}

module.exports = { get };
