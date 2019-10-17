"use strict";

const fetch = require("node-fetch");

const { url } = require("./utils");

const FLICKR_METHOD = "flickr.photosets.getList";
const FLICKR_EXTRA_PARAMS = "primary_photo_extras=url_n,url_o";

async function get() {
  const photosets = await fetchPhotosets(1);
  for (let i = 2; i <= photosets.pages; i++) {
    const morePhotosets = await fetchPhotosets(i);
    photosets.photoset = photosets.photoset.concat(morePhotosets.photoset);
  }
  return Promise.resolve(photosets.photoset);
}

async function fetchPhotosets(page = 1) {
  const response = await fetch(
    url({ method: FLICKR_METHOD, extrasParams: FLICKR_EXTRA_PARAMS, page })
  );
  if (!response.ok) {
    throw new Error("Error fetching photosets");
  }
  const data = await response.json();
  return Promise.resolve(data.photosets);
}

module.exports = { get };
