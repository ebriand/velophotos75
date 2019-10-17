"use strict";

const { flickr } = require("../config");

function url({ method, extraParams, page }) {
  let url = `${getFlickrApiUrl()}/?method=${method}&${getParams()}`;
  if (page) {
    url += `&page=${page}`;
  }
  if (extraParams) {
    url += `&${extraParams}`;
  }
  return url;
}

function getFlickrApiUrl() {
  return `${flickr.host}/services/rest`;
}

function getParams() {
  return `api_key=${flickr.apiKey}&user_id=${flickr.userId}&format=json&nojsoncallback=1`;
}

module.exports = {
  url
};
