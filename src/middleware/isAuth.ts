import { MiddlewareFn } from "type-graphql";
import { verify } from "jsonwebtoken";
import Context from "../interfaces/Context";

export const isAuth: MiddlewareFn<Context> = ({ context }, next) => {
  const authorization = context.req.headers["authorization"] as string;

  if (!authorization) {
    throw new Error("Not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    console.log(token);
    const payload = verify(token, process.env.SECRET || "apisecret");
    context.payload = payload as any;
  } catch (err) {
    console.log(err);
    throw new Error("Invalid authenticated");
  }
  return next();
};

export default isAuth;
