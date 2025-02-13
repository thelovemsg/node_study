import { request } from "undici";

request("https://www.google.com")
  .then((res) => {
    return res.body.text();
  })
  .then((body) => {
    console.log(body);
  });
