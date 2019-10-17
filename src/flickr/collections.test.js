"use strict";

const nock = require("nock");
const collections = require("./collections.js");

jest.mock("./utils", () => {
  return {
    url: jest.fn().mockImplementation(() => "http://localhost")
  };
});

test("get flickr collections", async () => {
  nock("http://localhost")
    .get("/")
    .reply(200, FLICKR_COLLECTIONS);

  const result = await collections.get();
  expect(result.length).toBe(2);
});

test("deal with flickr error", async () => {
  nock("http://localhost")
    .get("/")
    .reply(500);

  await expect(collections.get()).rejects.toBeTruthy();
});

const FLICKR_COLLECTIONS = {
  collections: {
    collection: [
      {
        id: "12040489898957711123994117",
        title: "VBONOINON",
        description: "",
        iconlarge: "/images/collection_default_l.gif",
        iconsmall: "/images/collection_default_s.gif",
        set: [
          {
            id: "709709707",
            title: "BONOINBOI",
            description: ""
          },
          {
            id: "09U09U09U",
            title: "ONZOINBOZINBR",
            description: ""
          }
        ]
      },
      {
        id: "120404144-0707097097097",
        title: "HDEUZFOHZF",
        description: "",
        iconlarge: "/images/collection_default_l.gif",
        iconsmall: "/images/collection_default_s.gif",
        set: [
          {
            id: "8098098080980",
            title: "OFHZOIVHZOIHOI",
            description: ""
          }
        ]
      }
    ]
  },
  stat: "ok"
};
