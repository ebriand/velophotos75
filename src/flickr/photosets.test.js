"use strict";

const nock = require("nock");
const photosets = require("./photosets.js");

jest.mock("./utils", () => {
  return {
    url: jest.fn().mockImplementation(({ page }) => `http://localhost/${page}`)
  };
});

test("get flickr photosets", async () => {
  nock("http://localhost")
    .get("/1")
    .reply(200, FLICKR_PHOTOSETS);

  const result = await photosets.get();
  expect(result.length).toBe(2);
});

test("get flickr photosets with multiple pages", async () => {
  FLICKR_PHOTOSETS.photosets.pages = 2;
  nock("http://localhost")
    .get("/1")
    .reply(200, FLICKR_PHOTOSETS);
  nock("http://localhost")
    .get("/2")
    .reply(200, FLICKR_PHOTOSETS);

  const result = await photosets.get();
  expect(result.length).toBe(4);
});

test("deal with flickr error", async () => {
  nock("http://localhost")
    .get("/1")
    .reply(500);

  await expect(photosets.get()).rejects.toBeTruthy();
});

const FLICKR_PHOTOSETS = {
  photosets: {
    page: 1,
    pages: 1,
    perpage: "500",
    total: "2",
    photoset: [
      {
        id: "80980808098098",
        owner: "3009380983",
        username: "VPEJRZPJPRVJ",
        primary: "8098098",
        secret: "909808",
        server: "0808908",
        farm: 7,
        count_views: 7,
        count_comments: 0,
        count_photos: "130",
        count_videos: 0,
        title: {
          _content: "HFOZOEFOZEHFOFE"
        },
        description: { _content: "" },
        can_comment: 1,
        date_create: "1570962550",
        date_update: "1570962583",
        photos: "130",
        videos: 0,
        visibility_can_see_set: 1,
        needs_interstitial: 0
      },
      {
        id: "809809098",
        owner: "EFZOIJFOEZF",
        username: "ONZDOVNZOEVN",
        primary: "82030830983",
        secret: "CJEIOCEJ",
        server: "08098",
        farm: 333,
        count_views: 1,
        count_comments: 0,
        count_photos: 86,
        count_videos: 0,
        title: {
          _content: "OFZJOIEZOIVJ"
        },
        description: { _content: "" },
        can_comment: 1,
        date_create: "1570961417",
        date_update: "1570961434",
        photos: 86,
        videos: 0,
        visibility_can_see_set: 1,
        needs_interstitial: 0
      }
    ]
  },
  stat: "ok"
};
