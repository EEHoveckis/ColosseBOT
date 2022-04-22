import { NextApiRequest, NextApiResponse } from "next";
import { GetFines } from "../../../../util/database";

const main = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "GET") return; //TODO: Return response
  const data = GetFines();
  res.status(200).send(data);
};
export default main;
