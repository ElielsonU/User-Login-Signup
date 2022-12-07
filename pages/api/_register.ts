import { NextApiHandler } from "next";
import { addDatabaseUser, TokenGenerator } from "./utils";

const handler: NextApiHandler = async (req, res) => {
  if( await addDatabaseUser(req)) {
    res.status(200).json({token : await TokenGenerator(req)})
    return
  }
  res.send(false)
};

export default handler;
