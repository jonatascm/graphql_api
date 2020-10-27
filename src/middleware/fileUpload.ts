import { MiddlewareFn } from "type-graphql";
import Context from "../interfaces/Context";

export const fileUpload: MiddlewareFn<Context> = ({ context }, next) => {    
  console.log(context);
  return next();
};

export default fileUpload;
