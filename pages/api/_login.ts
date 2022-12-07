import { NextApiHandler } from "next";
import { getDatabaseUser, TokenGenerator } from "./utils";

const handler: NextApiHandler = async (req, res) => {
  const userExists = await getDatabaseUser(req)
  if(!userExists) {
    res.send(false)
    return
  }
  res.status(200).json({token : await TokenGenerator(req)});
};

export default handler;