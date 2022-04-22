import { NextApiRequest, NextApiResponse } from "next";
import {
  CreateAuthCode,
  DestroyAuthCode,
  ValidateAuthCode,
} from "../../util/database";
import userData from "./data/passwords.json";
const main = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") return; //TODO: Return response
  const { type, password, username, authcode } = req.query;

  if (type === "0") {
    if (
      typeof type !== "string" ||
      typeof password != "string" ||
      typeof username != "string"
    ) {
      res.send({ msg: "failed" });
      return;
    }
    if (!password || !username)
      res
        .status(404)
        .send({ msg: "Couldn't find password and username in query." });
    else {
      var sent = false;
      for (var i = 0; i < userData.length; i++) {
        var el = userData[i];
        if (el.password === password && el.username === username) {
          const authCode = CreateAuthCode(username);
          if (!sent) {
            res.send({
              data: el,
              msg: "Successfully fetched person's account.",
              authcode: authCode,
            });
            sent = true;
          }
        }
      }
      if (!sent)
        res.send({
          msg: "Failed.",
        });
    }
  } else if (type === "1") {
    if (
      typeof type !== "string" ||
      typeof username != "string" ||
      typeof authcode != "string"
    ) {
      res.send({ msg: "failed" });
      return;
    }
    if (ValidateAuthCode(authcode, username))
      res.status(200).send({ msg: "Authorized" });
    else res.status(498).send({ msg: "Unauthorized" });
  } else if (type === "2") {
    if (
      typeof type !== "string" ||
      typeof username != "string" ||
      typeof authcode != "string"
    ) {
      res.send({ msg: "failed" });
      return;
    }
    if (ValidateAuthCode(authcode, username)) {
      DestroyAuthCode(authcode, username);
      res.status(200).send({ msg: "Authorized" });
    } else res.status(498).send({ msg: "Unauthorized" });
  }
};
export default main;
