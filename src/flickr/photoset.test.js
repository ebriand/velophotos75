"use strict";

const nock = require("nock");
const photoset = require("./photoset.js");

jest.mock("./utils", () => {
  return {
    url: jest.fn().mockImplementation(({ page }) => `http://localhost/${page}`)
  };
});

test("get flickr photoset", async () => {
  nock("http://localhost")
    .get("/1")
    .reply(200, FLICKR_PHOTOSET);

  const result = await photoset.get();
  expect(result.length).toBe(2);
});

test("get flickr photoset with multiple pages", async () => {
  FLICKR_PHOTOSET.photoset.pages = 2;
  nock("http://localhost")
    .get("/1")
    .reply(200, FLICKR_PHOTOSET);
  nock("http://localhost")
    .get("/2")
    .reply(200, FLICKR_PHOTOSET);

  const result = await photoset.get();
  expect(result.length).toBe(4);
});

test("deal with flickr error", async () => {
  nock("http://localhost")
    .get("/1")
    .reply(500);

  await expect(photoset.get()).rejects.toBeTruthy();
});

const FLICKR_PHOTOSET = {
  photoset: {
    id: "72157690999999885",
    primary: "999993685",
    owner: "1208989898",
    ownername: "bob",
    photo: [
      {
        id: "37940153685",
        secret: "a56dbbbcd0",
        server: "4579",
        farm: 5,
        title: "DSC_0892",
        isprimary: 0,
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
      },
      {
        id: "37940153145",
        secret: "e8abc48819",
        server: "4583",
        farm: 5,
        title: "DSC_0377",
        isprimary: 0,
        ispublic: 1,
        isfriend: 0,
        isfamily: 0
      }
    ],
    page: 1,
    per_page: "500",
    perpage: "500",
    pages: 1,
    title: "bonjour",
    total: "198"
  },
  stat: "ok"
};
