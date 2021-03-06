import { NowRequest, NowResponse } from "@now/node";
import request from "superagent";

module.exports = (req: NowRequest, res: NowResponse) => {
  request
    .get("https://itunes.apple.com/search?media=podcast&term=" + req.query.term)
    .then(r => {
      res.removeHeader("Cache-Control");
      res.setHeader("Cache-Control", "public, max-age=86400");
      res.setHeader("Content-Type", "application/json");
      res.send(r.text);
    })
    .catch(() => res.status(500));
};
