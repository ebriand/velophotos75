"use strict";

const fetch = require("node-fetch");

const { url } = require("./utils");

const FLICKR_METHOD = "flickr.collections.getTree";

async function get() {
  const response = await fetch(url({ method: FLICKR_METHOD }));
  if (!response.ok) {
    throw new Error("Error fetching collections");
  }
  const data = await response.json();
  return Promise.resolve(data.collections.collection);
}

module.exports = { get };
