import { NextApiRequest, NextApiResponse } from "next";
import { UpdateNotes } from "../../../../util/database";

const main = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method != "POST") return; //TODO: Return response
  const { content, name } = req.body;
  UpdateNotes(content, name);
  res.status(200).send({ msg: "Successfully updated." });
  process.stdout.write("Updated Notes\n");
};
export default main;
