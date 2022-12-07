import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  loggedAs?: string;
} | "ERROR";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.body.islogin) {
    const axiosRes = await axios.post("http://localhost:3000/api/_login", req.body);
    if (!axiosRes.data) {
      res.status(401).json("ERROR");
      return
    }
    res.status(200).json({ loggedAs: axiosRes.data.token});
    return
  }
  const axiosRes = await axios.post("http://localhost:3000/api/_register", req.body)
  if(!axiosRes.data) {
    res.status(404).json("ERROR")
    return
  }
  res.status(200).json({ loggedAs: axiosRes.data.token});
}
