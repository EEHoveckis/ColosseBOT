import { NextApiRequest, NextApiResponse } from "next";
import { GetPlayer } from "../../../../util/database";

interface RequestQuery {}

const main = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") return; //TODO: Return response
  const { name } = req.query;
  if (typeof name != "string") return;
  const data = GetPlayer(name);
  res.status(200).send(data);
};
export default main;
