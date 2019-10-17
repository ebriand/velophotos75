"use strict";

const utils = require("./utils.js");

jest.mock("../config", () => {
  return {
    flickr: {
      host: "http://localhost",
      userId: "toto",
      apiKey: "blah"
    }
  };
});

test("get url", () => {
  const url = utils.url({ method: "hello" });
  expect(url).toBe(
    "http://localhost/services/rest/?method=hello&api_key=blah&user_id=toto&format=json&nojsoncallback=1"
  );
});

test("get url with extra params", () => {
  const url = utils.url({ method: "hello", extraParams: "param=test" });
  expect(url).toBe(
    "http://localhost/services/rest/?method=hello&api_key=blah&user_id=toto&format=json&nojsoncallback=1&param=test"
  );
});

test("get url with page", () => {
  const url = utils.url({ method: "hello", page: 490 });
  expect(url).toBe(
    "http://localhost/services/rest/?method=hello&api_key=blah&user_id=toto&format=json&nojsoncallback=1&page=490"
  );
});
