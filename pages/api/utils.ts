import { JsonDB, Config } from "node-json-db";
import crypto from "node:crypto";

type Users = {
  username: string;
  password: string;
  token: string;
};

type Requisition = {
  body: {
    username: string;
    password: string;
  };
};

const database = new JsonDB(new Config("database", true, false, "/"));
database.load();

const getDatabaseUser = async (req: Requisition) => {
  const userExists = await database.find("/Users", (dbUser: Users) => {
    const reqUser = req.body;
    return (
      reqUser.username == dbUser.username && reqUser.password == dbUser.password
    );
  });

  return userExists;
};

const getDatabaseToken = async (reqToken: string) => {
  const userByToken: Users | undefined = await database.find(
    "/Users",
    (dbUser: Users) => {
      return dbUser.token == reqToken;
    }
  );

  return userByToken?.token;
};

const TokenGenerator = async (req: Requisition) => {
  const reqUserUsername = req.body.username;
  const UUID = crypto.randomUUID();
  let dbUserIndex: number | string = "";
  await database.find("/Users", (dbUser: Users, dbUserIndexExists) => {
    const equalUsers = reqUserUsername == dbUser.username;
    if (equalUsers) {
      dbUserIndex = dbUserIndexExists;
    }
    return equalUsers;
  });
  await database.push(`/Users[${dbUserIndex}]/token`, UUID);
  return UUID;
};

const addDatabaseUser = async (req: Requisition) => {
  const userExists = await database.find("/Users", (dbUser: Users) => {
    const reqUser = req.body;
    return reqUser.username == dbUser.username?true:false;
  });
  if (!userExists) {
    database.push("/Users[]", { ...req.body, token: "" });
    return true;
  }
  return false;
};

export { getDatabaseUser, addDatabaseUser, getDatabaseToken, TokenGenerator };
